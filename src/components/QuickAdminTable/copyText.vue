<template>
    <div  v-if='value'>{{ value }}<i class='el-icon-copy-document' style='padding-left: 10px;color: #11a983' @click='copy(value)'></i></div>
    <div v-else='value'>-</div>
</template>

<script>
import { Clipboard } from "v-clipboard"
export default {
    name: 'QuickAdminCopyText',
    props: {
        value: {
            required: true,
            type: String | Number,
        },
    },
    methods:{
        copy(value){
            Clipboard.copy(value)
            this.msgSuccess('复制成功')
        }
    }
}
</script>
