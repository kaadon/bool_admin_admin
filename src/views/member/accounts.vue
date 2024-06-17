<template>
    <div class='app-container'>
        <el-card shadow='never'>
            <!-- 条件查询 -->
            <el-form v-show='showSearch' ref='queryForm' :model='queryParams' label-width='120px'
                     @keyup.enter.native='submitSearch' @submit.native.prevent>
                <el-row>
                    <el-col :md='6' :sm='12'>
                        <el-form-item label='ID:' prop='id.value'>
                            <el-input v-model='queryParams.id.value' placeholder='请输入' clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :md='6' :sm='12'>
                        <el-form-item class='ele-text-right' label-width='50px'>
                            <el-button type='primary' size='mini' @click='submitSearch' icon='el-icon-search'
                                       class='ele-btn-icon'>搜索
                            </el-button>
                            <el-button @click='resetQuery' size='mini' icon='el-icon-refresh'>重置</el-button>
                            <el-link @click='searchExpand = !searchExpand' type='primary' :underline='false'
                                     class='ml0'>
                                <template v-if='searchExpand'> 收起<i class='el-icon-arrow-up'></i></template>
                                <template v-else> 展开<i class='el-icon-arrow-down'></i></template>
                            </el-link>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- 案例操作 -->
            <el-row :gutter='10' class='mb8'>
                <el-col :span='1.5'>
                    <el-button type='primary' plain icon='el-icon-plus' size='mini' @click='open'
                               v-hasPermi='$api.member.account.add'>
                        添加
                    </el-button>
                </el-col>
                <el-col :span='1.5'>
                    <el-button type='danger' plain icon='el-icon-delete' size='mini' :disabled='multiple'
                               @click='handleDelete' v-hasPermi='$api.member.account.delete'>删除
                    </el-button>
                </el-col>
                <el-col :span='1.5'>
                    <el-button type='warning' plain icon='el-icon-download' size='mini' v-loading='exportLoading'
                               @click='handleExport' v-hasPermi='$api.member.account.export'>导出
                    </el-button>
                </el-col>
                <right-toolbar :showSearch.sync='showSearch' @queryTable='initIndex' :columns='columns'
                               printId='#quickadmin'></right-toolbar>
            </el-row>
            <!-- 列表 -->
            <qa-table
                :source='tableData'
                :columns='columns'
                :selection='true'
                :loading='loading'
                @sortChange='sortChange'
                @statusChange='statusChange'
                @selectionChange='selectionChange'
                id='quickadmin'
            >
                <template v-slot:action>
                    <el-table-column label='操作' width='180'>
                        <template slot-scope='scope'>
                            <el-button size='mini' type='text' icon='el-icon-edit' @click='handleEdit(scope.row)'
                                       v-hasPermi='$api.member.account.edit'>编辑
                            </el-button>
                            <el-button size='mini' type='text' icon='el-icon-tickets' @click='handleDetail(scope.row)'
                                       v-hasPermi='$api.member.account.find'>详情
                            </el-button>
                            <el-button size='mini' type='text' icon='el-icon-delete' @click='handleDelete(scope.row)'
                                       v-hasPermi='$api.member.account.delete'>删除
                            </el-button>
                        </template>
                    </el-table-column>
                </template>
            </qa-table>
            <!-- 分页 -->
            <pagination :total='total' :page.sync='pageInfo.page' :limit.sync='pageInfo.limit'
                        @pagination='initIndex' />
        </el-card>
        <!-- 编辑弹窗 -->
        <el-dialog :visible='editOpen' :before-close='beforeClose' :fullscreen='isFullScreen'>
            <template slot='title'>
                <div class='relative'>
                    {{ !disabled ? '编辑' : '详情' }}
                    <span class='full-icon' @click='fullScreen'>
                        <i class='el-icon-full-screen'></i>
                    </span>
                </div>
            </template>
            <EditForm ref='editForm'
                      :findFormData='findFormData'
                      :disabled='disabled'
                      @submitForm='submitForm'
                      @editFormCancel='beforeClose' />
        </el-dialog>
    </div>
</template>
<script>
import { curdMixin } from '@/mixins/curdMixin'
import EditAccountForm from './EditAccountForm.vue'
import { editMemberAccount, listMemberAccount } from "@/api/member/account"

export default {
    name: 'Curd',
    mixins: [curdMixin],
    components: { EditAccountForm },
    data() {
        return {
            // table结构
            columns: [
                {
                    visible: true,
                    label: 'ID',
                    prop: 'id',
                },
                {
                    label: '头像',
                    visible: true,
                    prop: 'profile.avatar',
                    component: 'QuickAdminImage'
                },
                {
                    visible: true,
                    label: '层级',
                    prop: 'floor',
                },
                {
                    visible: true,
                    label: '邀请码',
                    prop: 'uuid',
                },
                {
                    visible: true,
                    label: '状态',
                    prop: 'status',
                    component: 'QuickAdminSwitch'
                },
                {
                    visible: true,
                    label: '会员等级',
                    prop: 'level',
                    formatter:(prop)=>{
                        return prop === 0 ? '普通会员' : '高级会员'
                    }
                },
                {
                    visible: true,
                    label: '实名认证',
                    prop: 'authen',
                },
                {
                    visible: true,
                    label: '邀请人',
                    prop: 'inviter',
                    formatter:(prop)=>{
                        return prop ? prop : '-'
                    }
                },
                {
                    visible: true,
                    label: 'APIID',
                    prop: 'api_id',
                },
                {
                    visible: true,
                    label: 'APIKEY',
                    prop: 'api_key',
                },
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
            return this.$api.member.account
        },
    },
    created() {
        this.initIndex()
    },
    methods: {
        // 案列：当前组件格式化方法
        testFormatter(prop) {
            return prop
        },
        statusChange(row) {
            editMemberAccount({
                id: row[this.primaryKey],
                [row.switch_target]: row.new_switch,
            }).then(() => {
                this.initIndex()
                this.msgSuccess(text + '成功')
            })
        },
        initIndex() {
            this.loading = true
            const qyparams = {
                ...this.pageInfo,
                ...this.formatQueryParams(this.queryParams),
            }
            listMemberAccount(qyparams).then(response => {
                this.tableData = response.data.list
                this.total = response.data.count
            }).finally(() => {
                this.loading = false
            })
        },
    },
}
</script>
