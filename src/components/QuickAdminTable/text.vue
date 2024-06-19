<template>
    <div>
        <p v-if="!value && parseInt(value) !== 0">-</p>
        <p v-else>{{ value }}</p>
    </div>
</template>
<script>
export default {
    name: 'QuickAdminText',
    props: {
        value: {
            required: true,
            type: String | Number,
        },
    },
}
</script>
