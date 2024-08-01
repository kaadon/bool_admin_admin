<template>
    <div class="app-container">
        <el-card shadow="never">
            <!-- 条件查询 -->
            <el-form v-show="showSearch" ref="queryForm" :model="queryParams" label-width="120px"
                     @keyup.enter.native="submitSearch" @submit.native.prevent
            >
                <el-row>
                    <el-col :md="6" :sm="12">
                        <el-form-item label="会员ID:" prop="time.value">
                            <el-date-picker
                                v-model="queryParams.time.value"
                                type="month"
                                value-format="yyyy-MM-dd"
                                placeholder="选择月"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="6" :sm="12">
                        <el-form-item label="会员ID:" prop="mid.value">
                            <el-input v-model="queryParams.mid.value" placeholder="请输入会员ID" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :md="6" :sm="12">
                        <el-form-item label="币种:" prop="currency.value">
                            <el-select v-model="queryParams.currency.value" filterable allow-create
                                       default-first-option placeholder="请选择"
                            >
                                <el-option v-for="extendItem in currency" :key="extendItem.value"
                                           :label="extendItem.label"
                                           :value="extendItem.value"
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
                <right-toolbar :showSearch.sync="showSearch" @queryTable="initIndex" :columns="columns"
                               printId="#quickadmin"
                ></right-toolbar>
            </el-row>
            <!-- 列表 -->
            <el-tabs v-model="activeTab" @tab-click="handleBusiness" type="border-card">
                <el-tab-pane v-for="(item, index) in [{label:'全部',value:''},...business]" :key="index"
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
                    </qa-table>
                </el-tab-pane>
            </el-tabs>
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
import {timeStampToString} from '@kaadon.com/helper/helper/time'

export default {
    name: 'MerchantRecordLog',
    mixins: [curdMixin],
    data() {
        return {
            business: [],
            currency: [],
            // table结构
            columns: [
                {
                    visible: true,
                    label: 'ID',
                    prop: 'id',
                },
                {
                    visible: true,
                    label: '会员',
                    prop: 'mid',
                    component: 'QuickAdminListText',
                    formatter: (prop, row) => {
                        let list = [{
                            name: '会员ID',
                            value: prop,
                            copy: true
                        }]
                        if (row?.profile) list.push({
                            name: '',
                            value: row.profile?.mobile || row.profile?.email,
                            copy: true,
                        })
                        return list
                    },
                },
                {
                    visible: true,
                    label: '币种',
                    prop: 'currency',
                    formatter: (prop) => {
                        return this.currency.find(item => item.value === prop)?.label
                    },
                },
                {
                    visible: true,
                    label: '商业类型',
                    prop: 'business',
                    formatter: (prop) => {
                        return this.business.find(item => item.value === prop)?.label
                    },
                },
                {
                    visible: true,
                    label: '变更前',
                    prop: 'before',
                    formatter: (prop) => {
                        if (parseFloat(prop) === 0) return '0'
                        return numberFormat(prop, 4, '.')
                    },
                },
                {
                    visible: true,
                    label: '金额',
                    prop: 'now',
                    formatter: (prop) => {
                        if (parseFloat(prop) === 0) return '0'
                        return numberFormat(prop, 4, '.')
                    },
                },
                {
                    visible: true,
                    label: '变更后',
                    prop: 'after',
                    formatter: (prop) => {
                        if (parseFloat(prop) === 0) return '0'
                        return numberFormat(prop, 4, '.')
                    },
                },
                {
                    visible: true,
                    label: '系统',
                    prop: 'system',
                    formatter: (prop) => {
                        return parseInt(prop) === 1 ? '是' : '否'
                    },
                },
                {
                    visible: true,
                    label: '记录',
                    prop: 'remark'
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
                currency: {
                    value: undefined,
                    op: '=',
                },
                business: {
                    value: undefined,
                    op: '=',
                },
                time: {
                    value: timeStampToString(parseInt(((new Date()).getTime() / 1000).toString()), 'Y-m-d'),
                    op: '=',
                },
            },
        }
    },
    computed: {
        api() {
            return this.$api.merchant.record_logs
        },
    },
    created() {
        if (this.$route.query?.mid) this.queryParams.mid.value = this.$route.query.mid

        this.initIndex()
    },
    methods: {
        handleBusiness(tab) {
            this.queryParams.business.value = tab.name
            this.submitSearch()
        },
        // 案列初始化列表
        initIndex() {
            this.loading = true
            const qyparams = {
                ...this.pageInfo,
                ...this.formatQueryParams(this.queryParams),
            }
            this.request.get(this.api.index, {params: qyparams}).then(response => {
                this.business = response.data.business
                this.currency = response.data.currency
                this.tableData = response.data.list
                this.total = response.data.count
            }).finally(() => {
                this.loading = false
            })
        },
    },
}
</script>
