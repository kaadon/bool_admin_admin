<template>
    <div class="block">
        <span class="demonstration">默认</span>
        <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
    </div>
</template>

<script>
export default {
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
                console.log(val)
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
                console.log(val)
                this.$emit('time_range_change', (new Date(val[0])).toLocaleTimeString() + '|' + (new Date(val[1])).toLocaleTimeString())
            },
            immediate: true,
            deep: true,
        }
    },
}
</script>
