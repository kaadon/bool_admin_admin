<template>
    <el-card shadow="never" style="max-height: 700px; overflow: auto">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px" :disabled="disabled">
            <el-form-item label="id:" prop="id" v-show="is_add">
                <el-input v-model="form.id" disabled />
            </el-form-item>
            <el-form-item label="邀请码:" prop="inviter">
                <SelectPage v-model="form.inviter" :url="editFormParams.selectPage" :multiple="false" />
            </el-form-item>
            <el-form-item label="账号类型:" prop="cate" v-if="is_add">
                <el-input v-model="form.cate" placeholder="请输入账号类型" clearable />
            </el-form-item>
            <el-form-item label="用户名:" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" clearable />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" clearable />
            </el-form-item>
            <el-form-item label="等级:" prop="level">
                <el-input v-model="form.level" placeholder="请输入等级" clearable />
            </el-form-item>
            <el-form-item label="实名:" prop="authen">
                <el-input v-model="form.authen" placeholder="请输入等级" clearable />
            </el-form-item>
            <el-form-item label="状态:" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(item, index) in status" :key="index" :label="item.value">{{ item.label }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">确认 </el-button>
                <el-button type="warning" @click="cancel">取消 </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
export default {
    name: 'EditAccountForm',
    props: {
        findFormData: {
            type: Object,
            default: {},
        },
        editFormParams: {
            type: Object,
            default: {},
        },
        // 表单是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            // 编辑表单验证规则
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
            },
            form: { actdata: [] },
            status: [
                { label: '正常', value: 1 },
                { label: '暂停', value: 0 },
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
                }else {
                    this.is_add = true
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
