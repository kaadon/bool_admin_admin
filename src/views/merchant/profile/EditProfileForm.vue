<template>
    <el-card shadow="never" style="max-height: 700px; overflow: auto">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px" :disabled="disabled">
            <el-form-item label="id:" prop="id">
                <el-input v-model="form.id" disabled/>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱" clearable/>
            </el-form-item>
            <el-form-item label="手机号:" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请输入手机号" clearable/>
            </el-form-item>
            <el-form-item label="姓名:" prop="realname">
                <el-input v-model="form.realname" placeholder="请输入姓名" clearable/>
            </el-form-item>
            <el-form-item label="昵称:" prop="nickname">
                <el-input v-model="form.nickname" placeholder="请输入昵称" clearable/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">确认</el-button>
                <el-button type="warning" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
export default {
    name: 'EditProfileForm',
    props: {
        findFormData: {
            type: Object,
            default: () => {
                return {}
            },
        },
        editFormParams: {
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
                title: [{required: true, message: '请输入标题', trigger: 'blur'}],
            },
            form: {actdata: []},
            status: [
                {label: '正常', value: 1},
                {label: '暂停', value: 0},
            ],
            is_add: false
        }
    },
    watch: {
        findFormData: {
            handler(val) {
                if (JSON.stringify(val) != '{}') {
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
