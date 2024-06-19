<template>
    <div style='text-align: left' class='text-ellipsis'>
        <div v-for='(list,index) in list' :key='index'>
            <div v-if='list.copy' >
                {{list.name?list.name + ":":""}}{{list.value}}
                <i class='el-icon-copy-document' style='padding-left: 10px;color: #11a983' @click='copy(list.value)' ></i>
            </div>
            <div v-else-if='list.pop'>
                <el-popover trigger="hover" placement="top" v-if="list.value">
                    <p>
                        {{list.name?list.name + ":":""}}{{list.value}}
                    </p>
                    <div slot="reference" class="name-wrapper">
                        {{list.name?list.name + ":":""}}{{list.value}}
                    </div>
                </el-popover>
            </div>
            <div v-else>
                {{list.name?list.name + ":":""}}{{list.value}}
            </div>
        </div>
    </div>
</template>

<style>
.text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

</style>
<script>
import { Clipboard } from 'v-clipboard'
import { isArray } from '@/utils/validate'

export default {
    name: 'QuickAdminListText',
    data:()=>{
        return {
            list:[]
        }
    },
    props: {
        value: {
            required: true,
            type: Array,
        },
    },
    watch:{
        value:{
            handler(val){
                if(isArray(val))this.list = val.map(item=>{
                    if (!item?.copy)item.copy = false
                    if (!item?.pop)item.pop = false
                    return item
                })
            },
            immediate:true,
            deep:true
        }
    },
    methods:{
        copy(value){
            Clipboard.copy(value)
            this.msgSuccess('复制成功')
        }
    }
}
</script>
