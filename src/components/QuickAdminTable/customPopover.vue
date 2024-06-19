<template>
    <div>
        <el-popover trigger="hover" placement="top" v-if="value.value">
            <p>{{ value.value }}</p>
            <div slot="reference" class="name-wrapper">
                <el-tag>{{ value.label }}</el-tag>
            </div>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: 'QuickAdminCustomPopover',
    props: {
        value: {
            required: true,
            type: Object,
        },
    },
}
</script>
