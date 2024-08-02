<template>
    <el-card shadow="never" style="max-height: 700px; overflow: auto">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px">
            <el-form-item label="标题:" prop="title">
                <el-input v-model="form.title" placeholder="标题" clearable/>
            </el-form-item>
            <el-form-item label="配置类型:" prop="type" clearable>
                <el-select v-model="form.type" filterable allow-create
                           default-first-option placeholder="请选择"
                >
                    <el-option v-for="typeItem in types" :key="typeItem.value" :label="typeItem.tab"
                               :value="typeItem.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="配置组:" prop="group" clearable>
                <el-radio-group v-model="form.group">
                    <el-radio v-for="(groupItem, index) in groups" :label="groupItem.value">{{
                            groupItem.label
                        }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="配置项:" prop="sign">
                <el-input v-model="form.sign" placeholder="配置项" clearable/>
            </el-form-item>
            <el-form-item label="配置值:" prop="value">
                <el-input v-model="form.value" placeholder="配置值" clearable/>
            </el-form-item>
            <el-form-item label="权重:" prop="weigh">
                <el-input v-model="form.weigh" type="number" placeholder="权重" clearable/>
            </el-form-item>
            <el-form-item label="备注:" prop="remark">
                <el-input v-model="form.remark" placeholder="备注" clearable/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitFormData">确认</el-button>
                <el-button type="warning" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>

export default {
    name: 'AddConfigForm',
    props: {
        types: {
            type: Array,
            default: () => {
                return []
            },
        },
        groups: {
            type: Array,
            default: () => {
                return []
            },
        }
    },
    data: () => {
        return {
            rules: {
                title: [
                    {required: true, message: '请输入标题', trigger: 'blur'},
                ],
                type: [
                    {required: true, message: '请输入配置类型', trigger: 'blur'},
                ],
                group: [
                    {required: true, message: '请输入配置组', trigger: 'blur'},
                ],
                sign: [
                    {required: true, message: '请输入配置项', trigger: 'blur'},
                ],
                value: [
                    {required: true, message: '请输入配置值', trigger: 'blur'},
                ],
                weigh: [
                    {required: true, message: '请输入权重', trigger: 'blur'},
                ],
                remark: [
                    {required: true, message: '请输入备注', trigger: 'blur'},
                ]
            },
            form: {
                title: undefined,
                group: undefined,
                sign: undefined,
                type: undefined,
                value: undefined,
                weigh: undefined,
                remark: undefined,
            }
        }
    },
    methods: {
        // 取消按钮
        cancel() {
            this.$emit('editFormCancel')
        },
        submitFormData() {
            this.$refs['form'].validate((valid, obj) => {
                if (valid) {
                    this.$emit('submitForm', this.form);
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
