<template>
    <el-card shadow="never" style="max-height: 700px; overflow: auto">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px">
            <el-form-item label="邀请码:" prop="inviter">
                <el-input v-model="form.inviter" placeholder="请输入邀请码" clearable/>
            </el-form-item>
            <el-form-item label="账号类型:" prop="cate" v-if="Cates">
                <el-radio-group v-model="form.cate">
                    <el-radio v-for="(item, index) in Cates" :key="index" :label="item.value">{{
                            item.label
                        }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="用户名:" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" clearable/>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" clearable/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">确认</el-button>
                <el-button type="warning" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import {inviterMemberProfile} from "@/api/member/profile";
import {isEmail} from '@kaadon.com/validate/validate/email';
import {isNumber} from '@kaadon.com/validate/validate/math';

export default {
    name: 'EditAccountForm',
    props: {
        Cates: {
            type: Array,
            default: () => {
                return []
            },
        },
        Levels: {
            type: Array,
            default: () => {
                return []
            },
        },
        editFormParams: {
            type: Object,
            default: () => {
                return {}
            },
        }
    },
    data() {
        var validateInviter = (rule, value, callback) => {
            inviterMemberProfile({inviter: value}).then((res) => {
                res.data.length === 0 ? callback(new Error('邀请码不存在')) : callback()
            }).catch((err) => {
                callback(new Error('邀请码不存在'))
            })
        };


        var validateUsername = (rule, value, callback) => {
            switch (this.form.cate) {
                case 1:
                    if (!isEmail(value)) callback('请输入正确的邮箱格式')
                    break;
                case 2:
                    if (!isNumber(value)) callback('请输入正确的手机号格式')
                    break;
            }
            callback()
        };
        return {
            // 编辑表单验证规则
            rules: {
                inviter: [
                    {required: true, message: '请输入邀请码', trigger: 'blur'},
                    {validator: validateInviter, trigger: 'blur'}
                ],
                cate: [{required: true, message: '请输入账号类型', trigger: 'blur'}],
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {validator: validateUsername, trigger: 'blur'}
                ],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
            },
            form: {
                inviter: undefined,
                cate: undefined,
                username: undefined,
                password: undefined,
            },
        }
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
