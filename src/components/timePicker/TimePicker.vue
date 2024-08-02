<template>
    <el-time-picker
        v-model="value"
        type="time"
        placeholder="任意时间点">
    </el-time-picker>
</template>

<script>
    import { isUndefined } from 'element-ui'

    export default {
        name: 'TimePicker',
        props:{
            time:{
                type:String,
                default:''
            }
        },
        data(){
           return {
               value:new Date()
           }
        },
        watch:{
            time(val){
                if(val){
                    this.value = new Date('2024-01-01 ' + val)
                }
            },
            value(val){
                console.log(val.toLocaleTimeString())
                console.log(new Date(val))
                // this.$emit('time_range_change',)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
