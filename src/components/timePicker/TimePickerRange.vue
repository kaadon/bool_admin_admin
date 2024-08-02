<template>
    <el-time-picker
        is-range
        v-model="value"
        range-separator="至"
        :start-placeholder=start_time
        :end-placeholder=end_time
        placeholder='请选择时间范围'>
    </el-time-picker>
</template>
<script>
export default {
    name:'TimePickerRange',
    props: {
        time_range: {
            type: String,
            default: '00:00:00|23:29:29',
        },
    },
    data() {
        return {
            start_time: '00:00:00',
            end_time: '23:59:59',
            value: [
                new Date('2016-05-01 00:00:00'),
                new Date('2016-05-01 23:59:59'),
            ],
        }
    },
    watch: {
        time_range: {
            handler(val) {
                const time = val.split('|')
                this.value = [
                    new Date('2016-05-01 ' + time[0]),
                    new Date('2016-05-01 ' + time[1]),
                ]
            },
            immediate: true,
        },
        value:{
            handler(val) {
                this.$emit('time_range_change', (new Date(val[0])).toLocaleTimeString() + '|' + (new Date(val[1])).toLocaleTimeString())
            },
            immediate: true,
            deep: true,
        }
    },
}
</script>
