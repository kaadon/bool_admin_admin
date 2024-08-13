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
                        <el-form-item label="账号:">
                            <el-input v-model="queryParams['profile.mobile'].value" placeholder="请输入账号" clearable/>
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
                            <el-button size="mini" type="text" icon="el-icon-edit"
                                       @click="changeWallet(scope.row)"
                                       v-hasPermi="api.changeWallet"
                            >变更金额
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
    </div>
</template>
<script>
import {curdMixin} from '@/mixins/curdMixin'
import {numberFormat} from '@/utils/filters'

export default {
    name: 'MemberWallet',
    mixins: [curdMixin],
    data() {
        return {
            coins: [],
            // table结构
            columns: [
                {
                    visible: true,
                    label: 'ID',
                    prop: 'id',
                },
                {
                    visible: true,
                    label: '账号',
                    prop: 'mid',
                    width: 300,
                    component: 'QuickAdminListText',
                    formatter: (prop, row) => {
                        let profile = row?.profile || {}
                        return [
                            {
                                label: 'ID',
                                value: prop,
                                copy: prop
                            },
                            {
                                label: 'mobile',
                                value: profile?.mobile || '未填写',
                                copy: profile?.mobile
                            },
                            {
                                label: 'email',
                                value: row?.profile?.email || '未填写',
                                copy: profile?.email,
                            }
                        ]
                    },
                },
            ],
            // 搜索表单是否展开
            searchExpand: false,
            // 查询参数
            queryParams: {
                'profile.mobile': {
                    value: undefined,
                    op: '=',
                },
                mid: {
                    value: undefined,
                    op: '=',
                },
            },
        }
    },
    computed: {
        api() {
            return this.$api.member.wallet
        },
    },
    created() {
        if (this.$route.query?.mid) this.queryParams.mid.value = this.$route.query.mid
        this.initIndex()
    },
    watch: {
        coins: {
            handler(val) {
                let column = val.map((item) => {
                    return {
                        visible: true,
                        label: item.label + (item.unit !== item.label ? `(${item.unit})` : ""),
                        prop: item.field,
                        formatter: (prop) => {
                            if (parseFloat(prop) === 0) return 0
                            return numberFormat(prop, 4, ',')
                        },
                    }
                })
                this.columns = this.columns.concat(column)
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        changeWallet(row) {
            let _this = this
            let amount = 0
            this.$prompt('请输金额', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({value}) => {
                amount = parseFloat(value)
                return this.$prompt('请输备注', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                })
            }).then(({value}) => {
                return _this.request.post(this.api.changeWallet, {
                    mid: row.mid,
                    amount: amount,
                    remark: value
                })
            }).then((response) => {
                if (response?.message) _this.$message.success(response.message)
                _this.initIndex()
            }).catch((e) => {
                if (e?.message) this.$message.error(e.message)
            })
        },
        // 案列初始化列表
        initIndex() {
            this.loading = true
            const qyparams = {
                ...this.pageInfo,
                ...this.formatQueryParams(this.queryParams),
            }
            this.request.post(this.api.index, {params: qyparams}).then(response => {
                this.coins = response.data.coins
                this.tableData = response.data.list
                this.total = response.data.count
                console.log(this.coins)
            }).finally(() => {
                this.loading = false
            })
        },
    },
}
</script>
