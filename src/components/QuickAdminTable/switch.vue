<template>
    <div>
        <el-switch :value="value" :active-value="1" :inactive-value="-1" @change="statusChange"></el-switch>
    </div>
</template>

<script>
export default {
    name: 'QuickAdminSwitch',
    props: {
        value: {
            required: true,
            type: Number,
        },
    },
    methods: {
        statusChange(val) {
            const text = val === -1 ? '停用' : '起用'
            this.$confirm('确认要' + text + '吗?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.$emit('statusChange', val)
            }).then(() => {
                this.msgSuccess(text + '成功')
            }).catch(() => {
                val = val === -1 ? 1 : -1
                })
        },
    },
}
</script>
