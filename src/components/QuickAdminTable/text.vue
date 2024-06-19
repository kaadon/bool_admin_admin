<template>
    <div>
        <p v-if='value'>{{ value }}</p>
        <p v-else>-</p>
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
