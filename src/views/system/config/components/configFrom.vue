<template>
    <el-form-item prop="site_logo">
                <span slot="label">
                    <el-tooltip :content="detail.remark" placement="top" v-if="detail.remark">
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                    <span @click="copy(`get_config('${detail.group}','${detail.sign}')`)">
                        {{ detail.title }}
                    </span>
                </span>
        <el-input v-if=" detail.type === 'textarea'" v-model="value" type="textarea" :rows="4"/>
        <ImageUpload v-else-if=" detail.type === 'image'" v-model="value" :fileType="['png']"/>
        <el-switch v-else-if=" detail.type === 'switch'" v-model="value" active-color="#13ce66" active-value="1"
                   inactive-value="0"
        ></el-switch>
        <el-select v-else-if=" detail.type === 'select'" v-model="value" multiple filterable allow-create
                   default-first-option placeholder="请选择"
        >
            <el-option v-for="extendItem in detail.extend" :key="extendItem.value" :label="extendItem.label"
                       :value="extendItem.value"
            ></el-option>
        </el-select>
        <el-radio-group v-else-if=" detail.type === 'radio'" v-model="value">
            <el-radio v-for="extendItem in detail.extend" :label="extendItem.value">{{ extendItem.label }}</el-radio>
        </el-radio-group>
        <el-time-picker
            v-else-if="detail.type === 'time'"
            v-model="value"
            value-format="HH:mm:ss"
            type="time"
            placeholder="任意时间点"
        >
        </el-time-picker>
        <el-date-picker
            v-else-if="detail.type === 'date'"
            v-model="value"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
        >
        </el-date-picker>
        <el-date-picker
            v-else-if="detail.type === 'datetime'"
            v-model="value"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
        >
        </el-date-picker>
        <TimePickerRange :time_range="value" v-else-if="detail.type === 'time_range'" @time_range_change="valueChange"/>
        <el-input v-else v-model="value"/>
    </el-form-item>
</template>
<script>
import TimePickerRange from '@/components/timePicker/TimePickerRange.vue'
import {Clipboard} from 'v-clipboard'

export default {
    name: 'ConfigFrom',
    components: {TimePickerRange},
    props: {
        detail: {
            default: () => {
                return {
                    name: '',
                    title: '',
                    value: '',
                    remark: '',
                    type: 'input',
                    extend: false,
                }
            },
            type: Object,
        },
    },
    data: () => {
        return {
            name: '',
            title: '',
            value: '',
            remark: '',
            type: 'input',
            extend: false,
        }
    },
    watch: {
        detail: {
            handler(nVal) {
                nVal?.value && (this.value = nVal.value)
            },
            immediate: true,
            deep: true,
        },
        value: {
            handler(nVal) {
                if (nVal !== this.detail.value) this.$emit('configChange', {
                    name: this.detail.name,
                    value: nVal,
                })
            },
            immediate: true,
        },
    },
    methods: {
        valueChange(str) {
            this.value = str
        },
        copy(value) {
            Clipboard.copy(value)
            this.msgSuccess('复制成功')
        }
    },
}
</script>
<style scoped lang="scss">

</style>
