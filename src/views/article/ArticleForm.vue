<template>
    <el-card shadow="never" style="max-height: 700px; overflow: auto">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px" :disabled="disabled">
            <el-form-item label="id:" prop="id" v-if="findFormData?.id">
                <el-input v-model="form.id" disabled />
            </el-form-item>
            <el-form-item label="文章分类:" prop="cate">
                <el-select v-model="form.cate" placeholder="文章分类" clearable default-first-option filterable allow-create>
                    <el-option v-for="(item, index) in cates" :key="index" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="标题:" prop="email">
                <el-input v-model="form.title" placeholder="请输入标题" clearable />
            </el-form-item>
            <el-form-item label="图标:" prop="logo"
                          v-show="(cates.find(item => item.value === form.cate)?.options)?.find(optionItem=>optionItem==='logo')">
                <ImageUpload v-model="form.logo" />
            </el-form-item>
            <el-form-item label="跳转链接:" prop="url" v-show="(cates.find(item => item.value === form.cate)?.options)?.find(optionItem=>optionItem==='url')">
                <el-input v-model="form.url" placeholder="请输入跳转链接" clearable />
            </el-form-item>
            <el-form-item label="图片:" prop="images" v-show="(cates.find(item => item.value === form.cate)?.options)?.find(optionItem=>optionItem==='images')">
                <ImageUpload v-model="form.images" :limit="5" />
            </el-form-item>
            <el-form-item label="简介:" prop="introduction" v-show="(cates.find(item => item.value === form.cate)?.options)?.find(optionItem=>optionItem==='introduction')">
                <el-input v-model="form.introduction" placeholder="请输入简介" clearable type="textarea" />
            </el-form-item>
            <el-form-item label="内容:" prop="content" v-show="(cates.find(item => item.value === form.cate)?.options)?.find(optionItem=>optionItem==='content')">
                <Editor v-model="form.content" :readOnly="disabled" />
            </el-form-item>
            <el-form-item v-if="!disabled">
                <el-button type="primary" @click="submitForm">确认</el-button>
                <el-button type="warning" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import Editor from '@/components/Editor/index.vue'
import item from '@/layout/components/Sidebar/Item.vue'

export default {
    name: 'ArticleForm',
    computed: {
        item() {
            return item
        },
    },
    components: { Editor },
    props: {
        cates: {
            type: Array,
            default: () => {
                return []
            },
        },
        findFormData: {
            type: Object,
            default: () => {
                return {}
            },
        },
        // 表单是否禁用
        disabled: {
            type: Boolean,
            default: () => {
                return false
            },
        },
    },
    data() {
        return {
            // 编辑表单验证规则
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
            },
            form: {
                cate: undefined,
                title: undefined,
                logo: undefined,
                url: undefined,
                images: undefined,
                introduction: undefined,
                content: undefined,
            },
            status: [
                { label: '正常', value: 1 },
                { label: '暂停', value: 0 },
            ],
        }
    },
    watch: {
        findFormData: {
            handler(val) {
                if (JSON.stringify(val) !== '{}') {
                    this.$nextTick(() => {
                        this.form = val
                    })
                }
            },
            immediate: true,
            deep: false,
        },
    },
    methods: {
        // 取消按钮
        cancel() {
            this.$emit('editFormCancel')
        },
        submitForm() {
            this.$refs['form'].validate((valid, obj) => {
                if (valid) {
                    this.$emit('submitForm', this.form)
                }
            })
        },
        // 表单重置
        reset() {
            this.resetForm('form')
        },
    },
}
</script>
