import qaTable from '@/components/QuickAdminTable'
import Cookies from 'js-cookie'

export const curdMixin = {
    components: { qaTable },
    data () {
        return {
            // 表单禁用
            disabled: false,
            tableData: [],
            // 查询表单数据
            findFormData: {},
            // 是否展示编辑
            editOpen: false,
            //是搜展示搜索
            showSearch: true,
            //是否禁用
            multiple: true,
            // 总条数
            total: 0,
            // 分页参数
            pageInfo: {
                page: 1,
                limit: 10,
                sort: 'id',
                order: 'desc'
            },
            primaryKey:'id',
            // 是否全屏
            isFullScreen: false,
            loading: false,
            exportLoading: false,
            ids: [],
            activeTab: ''
        }
    },

    methods: {
        // 全屏
        fullScreen () {
            this.isFullScreen = !this.isFullScreen
        },

        //打开编辑表单
        open () {
            this.editOpen = true
        },

        // 监听排序改变
        sortChange (val) {
            this.pageInfo.sort = val.sort
            this.pageInfo.order = val.order
            this.initIndex()
        },

        // 案列初始化列表
        initIndex () {
            this.loading = true
            const qyparams = {
                ...this.pageInfo,
                ...this.formatQueryParams(this.queryParams)
            }

            this.request.get(this.api.index, { params: qyparams }).then(response => {
                this.tableData = response.data.list
                this.total = response.data.count
            }).finally(() => {
                this.loading = false
            })
        },

        // 编辑
        handleEdit (row) {
            this.handleFind(row[this.primaryKey])
        },

        // 编辑回显
        async handleFind (id) {
            let response = await this.request.get(this.api.find, {params: {id}})
            this.findFormData = this.formatFindData(response.data)
            this.editOpen = true
        },

        // 详情
        handleDetail (row) {
            this.handleFindDetail(row[this.primaryKey])
            this.disabled = true
        },

        // 详情回显
        async handleFindDetail (id) {
            let response = await this.request.get(this.api.find, {  params: { id } })
            this.findFormData = this.formatFindData(response.data)
            this.editOpen = true
        },

        // 导出
        handleExport () {
            // 只导出已勾选的项
            const _columns = this.columns.filter(item => item.visible)
            const fields = _columns.map((item) => {
                return { field: item.prop, comment: item.label }
            })
            this.$confirm('是否确认导出所有数据项?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.exportLoading = true;
                return this.request.post(this.api.export, {
                    ...this.pageInfo,
                    ...this.formatQueryParams(this.queryParams),
                    fields: JSON.stringify(fields)
                })
            }).then(({ data,filename }) => {
                this.download(data, filename || 'file.xlsx')
            }).catch(err => { })
                .finally(() => { this.exportLoading = false })
        },

        //监听选中的table
        selectionChange (selection) {
            this.ids = selection.map(item => item[this.primaryKey])
            this.multiple = !selection.length
        },

        // 删除
        handleDelete (row) {
            let tableIds = row[this.primaryKey] || this.ids
            tableIds = tableIds.toString()
            this.$confirm(`是否确认删除表编号为"${tableIds}"的数据项?`, '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return this.request.get(this.api.delete, { params: { id:tableIds } })
            }).then(() => {
                this.initIndex()
                this.msgSuccess('删除成功')
            }).catch(() => { })
        },

        //监听组件提交
        submitForm (formObj) {
            const filter_data = this.filterPostData(formObj, ['create_time', 'update_time'])
            if (formObj[this.primaryKey] !== undefined) {
                filter_data.id=filter_data[this.primaryKey];
                this.request
                    .post(this.api.edit, { ...filter_data })
                    .then(response => {
                        this.msgSuccess('修改成功')
                        this.initIndex()
                        this.beforeClose()
                    })
            } else {
                this.request
                    .post(this.api.add, { ...filter_data })
                    .then(response => {
                        this.msgSuccess('新增成功')
                        this.initIndex()
                        this.beforeClose()
                    })
            }
        },

        // 关闭弹窗监听
        beforeClose(from = 'editForm') {
            this.editOpen = false
            this.disabled = false
            this.findFormData = {}
            this.$refs[from].reset()
        },

        // 重置按钮操作
        resetQuery () {
            this.resetForm('queryForm')
            this.submitSearch()
        },

        // 搜索
        submitSearch () {
            this.pageInfo.page = 1
            this.initIndex()
        },

        //
        statusChange (row) {
            if (row.switch_target.indexOf('.') === -1 && row.switch_target === 'status'){
                this.request.post(this.api.status, { id: row[this.primaryKey], [row.switch_target]: row.new_switch }).then(() => {
                    this.initIndex()
                })
            }else {
                this.submitForm({ id: row[this.primaryKey], [row.switch_target]: row.new_switch })
            }
        },

    }
}
