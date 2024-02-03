<template>
    <el-row>
        <el-button size="mini" round @click="show">显示</el-button>
        <el-dialog :visible.sync="dialogVisible" title="预览" width="800" append-to-body>
            <div v-html="value" class="htmlPopover"></div>
        </el-dialog>
    </el-row>
</template>

<script>
export default {
    name: 'QuickAdminHtmlPopover',
    props: {
        value: {
            required: true,
            type: String,
            default: () => {
                return ''
            },
        },
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        show() {
            this.dialogVisible = !this.dialogVisible
        },
    },
}
</script>
<style lang="css">
.htmlPopover img {
    border-radius: 1rem;
    max-width: 100%;
}
</style>
