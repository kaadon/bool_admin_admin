<template>
    <div class="app-container">
        <el-card shadow="never">
            <!-- 条件查询 -->
            <el-form v-show="showSearch" ref="queryForm" :model="queryParams" label-width="120px"
                     @keyup.enter.native="submitSearch" @submit.native.prevent
            >
                <el-row>
                    <el-col :md="6" :sm="12">
                        <el-form-item label="ID:" prop="id.value">
                            <el-input v-model="queryParams.id.value" placeholder="请输入" clearable/>
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
                <template v-slot:action>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEdit(scope.row)"
                                       v-hasPermi="api.edit"
                            >编辑
                            </el-button>
                            <el-button size="mini" type="text" icon="el-icon-tickets" @click="handleDetail(scope.row)"
                                       v-hasPermi="api.find"
                            >详情
                            </el-button>
                            <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                                       v-hasPermi="api.delete"
                            >删除
                            </el-button>
                        </template>
                    </el-table-column>
                </template>
            </qa-table>
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
                            :disabled="disabled"
                            @submitForm="submitAddForm"
                            @editFormCancel="beforeAddFromClose"
            />
        </el-dialog>
    </div>
</template>
<script>
import {curdMixin} from '@/mixins/curdMixin'
import {addMerchantProfile, listMerchantProfile, optionsMerchantProfile} from "@/api/merchant/profile"
import EditProfileForm from "@/views/merchant/EditProfileForm.vue";
import AddAccountForm from "@/views/merchant/AddAccountForm.vue";

export default {
    name: 'Curd',
    mixins: [curdMixin],
    components: {EditProfileForm, AddAccountForm},
    data() {
        return {
            addOpen: false,
            cates: [],
            // table结构
            columns: [
                {
                    visible: true,
                    label: 'ID',
                    prop: 'uid',
                    width: '80px',
                },
                {
                    label: '头像',
                    visible: true,
                    prop: 'avatar',
                    component: 'QuickAdminImage',
                    width: '80px',
                },
                {
                    visible: true,
                    label: '账号',
                    prop: 'mobile',
                    component: 'QuickAdminListText',
                    formatter: (prop, row) => {
                        return this.columnsFormatter('account', row)
                    }
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
                                value: row.realname,
                            },
                            {
                                name: '昵称',
                                value: row.nickname,
                            }
                        ]
                    }
                },
                {
                    visible: true,
                    label: '邀请码',
                    prop: 'account.uuid',
                    component: 'QuickAdminCopyText'
                },
                {
                    visible: true,
                    label: '状态',
                    prop: 'account.status',
                    component: 'QuickAdminSwitch',
                    formatter(prop){
                        return parseInt(prop)
                    }
                }
            ],
            // 搜索表单是否展开
            searchExpand: false,
            // 查询参数
            queryParams: {
                id: {
                    value: undefined,
                    op: '=',
                },
            },
            status: [
                {
                    label: '显示',
                    value: 1,
                },
                {
                    label: '下架',
                    value: 0,
                },
            ],
        }
    },
    computed: {
        api() {
            return this.$api.merchant.profile
        },
    },
    created() {
        this.pagesInit()
    },
    methods: {
        columnsFormatter(key, row) {
            switch (key) {
                case 'account':
                    return this.cates.map(item => {
                        console.log(row)
                        return {
                            name: item.label,
                            value: row?.[item.label],
                        }
                    })
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
                filter_data.id = filter_data[this.primaryKey];
                this.request
                    .post(this.api.edit, {...filter_data})
                    .then(response => {
                        this.msgSuccess('修改成功')
                        this.initIndex()
                        this.beforeClose()
                    })
            } else {
                this.request
                    .post(this.api.add, {...filter_data})
                    .then(response => {
                        this.msgSuccess('新增成功')
                        this.initIndex()
                        this.beforeClose()
                    })
            }
        },
        submitAddForm(formObj) {
            const filter_data = this.filterPostData(formObj, ['create_time', 'update_time'])
            addMerchantProfile({...filter_data})
                .then(response => {
                    this.msgSuccess('新增成功')
                    this.initIndex()
                    this.beforeAddFromClose()
                })
        },
        async pagesInit() {
            let memberOptions = await optionsMerchantProfile()
            this.cates = (memberOptions?.data?.cates) ? memberOptions.data.cates.filter((item) => item.label !== 'system') : []
            this.initIndex()
        },
        // 关闭弹窗监听
        beforeAddFromClose() {
            this.addOpen = false
            this.disabled = false
            this.$refs['addForm'].reset()
        },
        initIndex() {
            this.loading = true
            const qyparams = {
                ...this.pageInfo,
                ...this.formatQueryParams(this.queryParams),
            }
            listMerchantProfile(qyparams).then(response => {
                this.tableData = response.data.list
                this.total = response.data.count
            }).finally(() => {
                this.loading = false
            })
        },
    },
}
</script>
