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
                            <el-input v-model="queryParams.id.value" placeholder="请输入" clearable />
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
                <right-toolbar :showSearch.sync="showSearch" @queryTable="initIndex" :columns="columns"
                               printId="#quickadmin"
                ></right-toolbar>
            </el-row>
            <!-- 列表 -->
            <el-tabs v-model="activeTab" @tab-click="handleCate" type="border-card">
                <el-tab-pane v-for="(item, index) in [{label:'全部',value:''},...cates]" :key="index" :label="item.label"
                             :name="item.value.toString()">
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
                                               @click="handleEdit(scope.row)"
                                               v-hasPermi="api.edit"
                                    >编辑
                                    </el-button>
                                    <el-button size="mini" type="text" icon="el-icon-tickets"
                                               @click="handleDetail(scope.row)"
                                               v-hasPermi="api.find"
                                    >详情
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
                    {{ findFormData?.id === 0 ? '新增' : (!disabled ? '编辑' : '详情') }}
                    <span class="full-icon" @click="fullScreen">
                        <i class="el-icon-full-screen"></i>
                    </span>
                </div>
            </template>
            <ArticleForm ref="editForm"
                         :cates="cates"
                         :findFormData="findFormData"
                         :disabled="disabled"
                         @submitForm="submitForm"
                         @editFormCancel="beforeClose"
            />
        </el-dialog>
    </div>
</template>
<script>
import { curdMixin } from '@/mixins/curdMixin'
import ArticleForm from '@/views/article/ArticleForm.vue'

export default {
    name: 'Curd',
    mixins: [curdMixin],
    components: { ArticleForm },
    data() {
        return {
            cates: [],
            levels: [],
            // table结构
            columns: [
                {
                    visible: true,
                    label: 'ID',
                    prop: 'id',
                },
                {
                    visible: true,
                    label: '文章类型',
                    prop: 'cate',
                    formatter: (prop) => {
                        return this.cates.find(item => item.value === prop)?.label
                    },
                },
                {
                    visible: true,
                    label: '标题',
                    prop: 'title',
                },
                {
                    visible: true,
                    label: 'logo',
                    prop: 'logo',
                    component: 'QuickAdminImage',
                },
                {
                    visible: true,
                    label: '跳转链接',
                    prop: 'url',
                    component: 'QuickAdminPopover'
                },
                {
                    visible: true,
                    label: '简介',
                    prop: 'introduction',
                },
                {
                    visible: true,
                    label: '内容',
                    prop: 'content',
                    component: 'QuickAdminHtmlPopover',
                },
                {
                    visible: true,
                    label: '状态',
                    prop: 'status',
                    component: 'QuickAdminSwitch',
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
                cate: {
                    value: undefined,
                    op: '=',
                },
            },
        }
    },
    computed: {
        api() {
            return this.$api.article.article
        },
    },
    created() {
        this.initIndex()
    },
    methods: {
        handleCate(tab) {
            this.queryParams.cate.value = tab.name
            this.submitSearch()
        },
        // 案列初始化列表
        initIndex() {
            this.loading = true
            const qyparams = {
                ...this.pageInfo,
                ...this.formatQueryParams(this.queryParams),
            }
            this.request.get(this.api.index, { params: qyparams }).then(response => {
                this.cates = response.data.cates
                this.tableData = response.data.list
                this.total = response.data.count
            }).finally(() => {
                this.loading = false
            })
        },
    },
}
</script>
