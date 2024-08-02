<template>
    <div class="app-container">
        <el-card>
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <span>系统配置</span>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="addConfigOpen">
                        添加配置
                    </el-button>
                </el-col>
            </el-row>
            <el-tabs v-model="activeTab">
                <el-tab-pane v-for="(item, index) in configList" :key="index" :label="item.label" :name="item.value">
                    <UploadConfig v-if="item.value === 'upload'" :detail="item.detail" :submitGetList="getList"
                                  :api-url="api.update"
                    />
                    <SiteConfig v-else :detail="item.detail.length === 0 ? {} : item.detail" :submitGetList="getList"
                                :api-url="api.update"
                    />
                </el-tab-pane>
            </el-tabs>
        </el-card>
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
            <AddConfigForm
                ref="addForm"
                :types="configTypes"
                :groups="configGroups"
                @submitForm="addConfig"
                @editFormCancel="beforeAddFromClose"
            ></AddConfigForm>
        </el-dialog>

    </div>
</template>

<script>
import SiteConfig from './site_config'
import UploadConfig from './upload_config'
import AddConfigForm from './components/AddConfigForm.vue'

export default {
    name: 'Config',
    components: {AddConfigForm, SiteConfig, UploadConfig},
    data() {
        return {
            isFullScreen: false,
            addOpen: false,
            activeTab: 'site',
            configList: [],
            configTypes: [],
            configGroups: [],
        }
    },
    created() {
        this.getList()
    },
    computed: {
        api() {
            return this.$api.config
        },
    },
    methods: {
        addConfigOpen() {
            this.addOpen = !this.addOpen;
        },
        // 全屏
        fullScreen() {
            this.isFullScreen = !this.isFullScreen
        },
        //关闭AddConfigForm
        beforeAddFromClose() {
            this.addOpen = false
            this.disabled = false
            this.$refs['addForm'].reset()
        },
        addConfig(formData) {
            this.request.post(this.api.add, {...formData}).then(response => {
                this.msgSuccess(response?.message || "添加成功")
                this.getList()
            }).finally(() => {
                this.addOpen = false
                this.$refs['addForm'].reset()
            })
        },
        // 查询参数列表
        getList() {
            this.loading = true
            this.request.post(this.api.index, {})
                .then(response => {
                    this.configTypes = response.data?.types || []
                    this.configList = response.data?.list || []
                    this.configGroups = this.configList.map(item => {
                        return {
                            label: item.label,
                            value: item.value,
                        }
                    })
                    this.total = response.total
                })
                .finally(() => {
                    this.loading = false
                })
        },
    },
}
</script>
