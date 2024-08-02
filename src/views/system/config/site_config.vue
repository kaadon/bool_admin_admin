<template>
    <div style="max-width: 600px">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <ConfigFrom v-for="(item,index) in detail" :key="index" :detail="item"
                        @configChange="configChange"
            />
            <el-form-item v-if="detail">
                <el-button type="primary" size="mini" @click="submit" v-hasPermi="$api.config.index">保存</el-button>
                <el-button type="danger" size="mini" @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import ConfigFrom from './components/configFrom.vue'

export default {
    components: {ConfigFrom},
    props: {
        detail: {
            default: () => {
                return {}
            },
            type: Object,
        },
        apiUrl: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            // 表单校验
            rules: {},
            form: {},
        }
    },
    watch: {
        detail: {
            handler(nVal, oVal) {
                for (const key in nVal) {
                    if (!this.form.hasOwnProperty(key)) this.form[key] = undefined
                    if (nVal[key]['value']) {
                        if (nVal[key]['value'].indexOf(',') !== -1) {
                            this.form[key] = nVal[key]['value'].split(',')
                        } else {
                            this.form[key] = nVal[key]['value']
                        }
                    }
                }
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        configChange(data) {
            this.form[data.name] = data.value
        },
        submit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    //判断this.apiUrl是否为空
                    if (this.apiUrl) {
                        this.request.post(this.apiUrl, this.form).then(response => {
                            this.$message.success('保存成功')
                            this.$emit('submitGetList')
                        })
                    } else this.$message.success('请先设置apiUrl')
                }
            })
        },
        close() {
            this.$store.dispatch('tagsView/delView', this.$route)
            this.$emit('submitGetList')
        },
    },
}
</script>
