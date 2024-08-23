<template>
    <div class="app-container">
        <el-card shadow="never">
            <!-- 条件查询 -->
            <el-form v-show="showSearch" ref="queryForm" :model="queryParams" label-width="120px"
                     @keyup.enter.native="submitSearch" @submit.native.prevent
            >
                <el-row>
                    <el-col :md="6" :sm="12">
                        <el-form-item label="会员ID:" prop="mid.value">
                            <el-input v-model="queryParams.mid.value" placeholder="请输入会员ID" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :md="6" :sm="12">
                        <el-form-item label="实名状态:">
                            <el-select v-model="queryParams['account.status'].value" filterable allow-create
                                       default-first-option placeholder="请选择"
                            >
                                <el-option
                                    v-for="(extendItem,index) in [{label:'全部',value:''},...(status.filter(item => item.value !== 2))]"
                                    :key="index" :label="extendItem.label"
                                    :value="extendItem.value.toString()"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="6" :sm="12">
                        <el-form-item class="ele-text-right" label-width="50px">
                            <el-button type="primary" size="mini" @click="submitSearch" icon="el-icon-search"
                                       class="ele-btn-icon"
                            >搜索
                            </el-button>
                            <el-button @click="resetQuery" size="mini" icon="el-icon-refresh">重置</el-button>
                            <el-link @click="searchExpand = !searchExpand" type="primary" :underline="false"
                                     class="ml0"
                            >
                                <template v-if="searchExpand"> 收起<i class="el-icon-arrow-up"></i></template>
                                <template v-else> 展开<i class="el-icon-arrow-down"></i></template>
                            </el-link>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- 案例操作 -->
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="open"
                               v-hasPermi="api.add"
                    >
                        添加
                    </el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
                               @click="handleDelete" v-hasPermi="api.delete"
                    >删除
                    </el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="warning" plain icon="el-icon-download" size="mini" v-loading="exportLoading"
                               @click="handleExport" v-hasPermi="api.export"
                    >导出
                    </el-button>
                </el-col>
                <right-toolbar :showSearch.sync="showSearch" @queryTable="initIndex" :columns="columns"
                               printId="#quickadmin"
                ></right-toolbar>
            </el-row>
            <!-- 列表 -->
            <el-tabs v-model="activeTab" @tab-click="handleAuthenAction" type="border-card">
                <el-tab-pane v-for="(item, index) in [{label:'全部',value:''},...authen]" :key="index"
                             :label="item.label"
                             :name="item.value.toString()"
                >
                    <qa-table
                        :source="tableData"
                        :columns="columns"
                        :selection="true"
                        :loading="loading"
                        @sortChange="sortChange"
                        @statusChange="statusChange"
                        @selectionChange="selectionChange"
                        id="quickadmin"
                    >
                        <template v-slot:action width="300">
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        v-if="scope.row.account.authen===2"
                                        size="mini" type="text" icon="el-icon-finished"
                                        @click="handleAuthen(scope.row,1)"
                                        v-hasPermi="api.authen"
                                    >通过实名
                                    </el-button>

                                    <el-button
                                        v-if="scope.row.account.authen===2"
                                        size="mini" type="danger" icon="el-icon-close"
                                        @click="handleAuthen(scope.row,0)"
                                        v-hasPermi="api.authen"
                                    >拒绝实名
                                    </el-button>
                                    <el-button size="mini" type="text" icon="el-icon-edit"
                                               @click="handleEdit(scope.row)"
                                               v-hasPermi="api.edit"
                                    >编辑
                                    </el-button>
                                    <el-button size="mini" type="text" icon="el-icon-tickets"
                                               @click="handleDetail(scope.row)"
                                               v-hasPermi="api.find"
                                    >详情
                                    </el-button>
                                    <el-button size="mini" type="danger" icon="el-icon-delete"
                                               @click="handleDelete(scope.row)"
                                               v-hasPermi="api.delete"
                                    >删除
                                    </el-button>

                                </template>
                            </el-table-column>
                        </template>
                    </qa-table>
                </el-tab-pane>
            </el-tabs>
            <!-- 分页 -->
            <pagination :total="total" :page.sync="pageInfo.page" :limit.sync="pageInfo.limit"
                        @pagination="initIndex"
            />
        </el-card>
        <!-- 编辑弹窗 -->
        <el-dialog :visible="editOpen" :before-close="beforeClose"
                   :fullscreen="isFullScreen"
        >
            <template slot="title">
                <div class="relative">
                    {{ !disabled ? '编辑' : '详情' }}
                    <span class="full-icon" @click="fullScreen">
                        <i class="el-icon-full-screen"></i>
                    </span>
                </div>
            </template>
            <EditProfileForm ref="editForm"
                             :findFormData="findFormData"
                             :disabled="disabled"
                             @submitForm="submitForm"
                             @editFormCancel="beforeClose"
            />
        </el-dialog>
        <el-dialog :visible="addOpen" :before-close="beforeAddFromClose"
                   :fullscreen="isFullScreen"
        >
            <template slot="title">
                <div class="relative">
                    {{ '添加' }}
                    <span class="full-icon" @click="fullScreen">
                        <i class="el-icon-full-screen"></i>
                    </span>
                </div>
            </template>
            <AddAccountForm ref="addForm"
                            :Cates="cates"
                            :Levels="levels"
                            :disabled="disabled"
                            @submitForm="submitAddForm"
                            @editFormCancel="beforeAddFromClose"
            />
        </el-dialog>
    </div>
</template>
<script>
import {curdMixin} from '@/mixins/curdMixin'
import {addMemberProfile, editMemberProfile} from '@/api/member/profile'
import EditProfileForm from '@/views/member/profile/EditProfileForm.vue'
import AddAccountForm from '@/views/member/profile/AddAccountForm.vue'

export default {
    name: 'MemberProfile',
    mixins: [curdMixin],
    components: {EditProfileForm, AddAccountForm},
    data() {
        return {
            addOpen: false,
            cates: [],
            status: [],
            levels: [],
            authen: [],
            // table结构
            columns: [
                {
                    visible: true,
                    label: 'ID',
                    prop: 'mid',
                },
                {
                    label: '头像',
                    visible: true,
                    prop: 'avatar',
                    component: 'QuickAdminImage',
                },
                {
                    visible: true,
                    label: '账号',
                    prop: 'mid',
                    width: 300,
                    component: 'QuickAdminListText',
                    formatter(prop, row) {
                        return [
                            {
                                label: '会员ID',
                                value: row?.mid || '-',
                                copy: row?.mid
                            },
                            {
                                label: 'mobile',
                                value: row?.mobile || '未填写',
                                copy: row?.mobile
                            },
                            {
                                label: 'email',
                                value: row?.email || '未填写',
                                copy: row?.email,
                            }
                        ]
                    }
                },
                {
                    visible: true,
                    label: '等级',
                    prop: 'account.level',
                    formatter: (prop) => {
                        return this.levels.find(item => item.value === prop)?.label || prop
                    },
                },
                {
                    visible: true,
                    label: '邀请码',
                    prop: 'account.uuid',
                    component: 'QuickAdminCopyText',
                },
                {
                    visible: true,
                    label: '姓名',
                    prop: 'realname',
                    component: 'QuickAdminListText',
                    formatter(prop, row) {
                        return [
                            {
                                name: '姓名',
                                value: row?.realname || '-',
                            },
                            {
                                name: '昵称',
                                value: row?.nickname || '-',
                            },
                        ]
                    },
                },
                {
                    visible: true,
                    label: '实名认证',
                    prop: 'account.authen',
                    formatter: (prop) => {
                        return this.status.find(item => item.value === prop)?.label || prop
                    },
                },
                {
                    visible: true,
                    label: '实名信息',
                    prop: 'verify',
                },
                {
                    visible: true,
                    label: '状态',
                    prop: 'account.status',
                    component: 'QuickAdminSwitch',
                },
            ],
            // 搜索表单是否展开
            searchExpand: false,
            // 查询参数
            queryParams: {
                mid: {
                    value: undefined,
                    op: '=',
                },
                'account.authen': {
                    value: undefined,
                    op: '=',
                },
                'account.status': {
                    value: undefined,
                    op: '=',
                },
            }
        }
    },
    computed: {
        api() {
            return this.$api.member.profile
        },
    },
    created() {
        if (this.$route.query?.mid) this.queryParams.mid.value = this.$route.query.mid
        this.initIndex()
    },
    watch: {
        status: {
            handler(val) {
                this.authen = val.map(item => {
                    let authen = {
                        '正常': '已实名',
                        '禁用': '未实名',
                        '待审核': '待审核',
                    }
                    return {
                        label: authen[item.label],
                        value: item.value,
                    }
                })
            },
            immediate: true
        }
    },
    methods: {
        handleAuthenAction(tab) {
            console.log(tab.name)
            this.queryParams['account.authen'].value = tab.name.toString()
            this.submitSearch()
        },
        handleAuthen(row, authenAction) {
            this.request.post(this.api.authen, {
                mid: row.mid,
                authen: authenAction,
            }).then(response => {
                if (response?.message) this.msgSuccess(response.message)
                this.initIndex()
            }).catch(err => {
                if (err?.message) this.msgError(err.message)
            })
        },
        columnsFormatter(key, row) {
            switch (key) {
                case 'account':
                    return this.cates.map(item => {
                        if (item.name === 'system') return undefined
                        return {
                            name: item.name,
                            value: row?.[item.name],
                        }
                    }).filter(item => item?.value)
                default:
                    return row[key]
            }
        },
        open() {
            this.addOpen = true
        },
        submitForm(formObj) {
            const filter_data = this.filterPostData(formObj, ['create_time', 'update_time'])
            if (formObj[this.primaryKey] !== undefined) {
                filter_data.id = filter_data[this.primaryKey]
                this.request
                    .post(this.api.edit, {...filter_data})
                    .then(response => {
                        this.msgSuccess(response?.message || '修改成功')
                        this.initIndex()
                        this.beforeClose()
                    })
            } else {
                this.request
                    .post(this.api.add, {...filter_data})
                    .then(response => {
                        this.msgSuccess(response?.message || '新增成功')
                        this.initIndex()
                        this.beforeClose()
                    })
            }
        },
        submitAddForm(formObj) {
            const filter_data = this.filterPostData(formObj, ['create_time', 'update_time'])
            addMemberProfile({...filter_data})
                .then(response => {
                    this.msgSuccess(response?.message || '新增成功')
                    this.initIndex()
                    this.beforeAddFromClose()
                })
        },
        // 关闭弹窗监听
        beforeAddFromClose() {
            this.addOpen = false
            this.disabled = false
            this.$refs['addForm'].reset()
        },
        statusChange(row) {
            editMemberProfile({
                id: row[this.primaryKey],
                [row.switch_target]: row.new_switch,
            }).then((res) => {
                this.initIndex()
                this.msgSuccess(res?.message || '修改成功')
            })
        },
        initIndex() {
            this.loading = true
            const qyparams = {
                ...this.pageInfo,
                ...this.formatQueryParams(this.queryParams),
            }
            this.request.get(this.api.index, {params: qyparams})
                .then(response => {
                    this.tableData = response.data.list
                    this.total = response.data.count
                    this.status = response.data.status
                    this.levels = response.data.levels
                    this.cates = response.data.cates
                }).finally(() => {
                this.loading = false
            })

        },
    },
}
</script>
