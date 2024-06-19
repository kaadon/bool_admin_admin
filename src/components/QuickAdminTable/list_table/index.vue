<template>
    <div>
        <div v-for='(item ,index) in tableList' :key='index' style='padding-top: 5px'>
            <el-popover trigger='hover' placement='top' v-if='value'>
                <p>{{ item.time_text }}: <span style='color: #1c84c6'>{{ item.text }}</span></p>
                <div slot='reference' class='name-wrapper'>
                    <el-tag>{{ item.text }}</el-tag>
                </div>
            </el-popover>
        </div>
        <div v-if='isMore' style='padding-top: 5px'>
            <el-button @click='watchMore' size='mini' icon='el-icon-more' type='primary'>查看更多</el-button>
        </div>
        <el-dialog :visible='listTableOpen' :before-close='beforeClose' :fullscreen='listTableFullScreen'>
            <template slot='title'>
                <div class='relative'>
                    {{ '消息详情' }}
                    <span class='full-icon' @click='listTableFullScreenOpen'>
                        <i class='el-icon-full-screen'></i>
                    </span>
                </div>
            </template>
            <ListTable ref='editForm' :disabled='true'
                       :listData='listTableData' :tableColumns='tableColumns' />
        </el-dialog>
    </div>
</template>
<script>

import { isArray } from '@/utils/validate'
import ListTable from '@/components/QuickAdminTable/list_table/table.vue'

export default {
    name: 'QuickAdminListTable',
    components: { ListTable },
    methods: {
        listTableFullScreenOpen(){
            this.listTableFullScreen = !this.listTableFullScreen
        },
        beforeClose(){
            this.listTableOpen = false
            this.listTableData = []
        },
        watchMore() {
            this.listTableData = this.tabledata
            this.listTableOpen = true
        },
        reset(){
            this.listTableFullScreen=false
            this.listTableOpen=false
            this.listTableData= []
            this.isMore= false
            this.tableList= []
            this.tableColumns= []
            this.tabledata= []
            this.showKey= []
            this.showNumber= 3
        }
    },
    data: () => {
        return {
            listTableFullScreen:false,
            listTableOpen:false,
            listTableData: [],
            isMore: false,
            tableList: [],
            tableColumns: [],
            tabledata: [],
            showKey: [],
            showNumber: 3,
        }
    },
    props: {
        value: {
            required: true,
            type: Object,
        },
    },
    watch: {
        value: {
            handler(val) {
                this.reset()
                const _chat = this
                if (val?.showKey) {
                    _chat.showKey = Array.isArray(val.showKey) ? val.showKey : [val.showKey]
                }
                if (val?.showNumber && Number(val.showNumber) >= 1) {
                    _chat.showNumber = Number(val.showNumber)
                }
                if (isArray(val?.data) && val.data.length > 0) {
                    _chat.tabledata  = val.data
                    if (_chat.tabledata.length > _chat.showNumber) _chat.isMore = true
                    for (const tableDatum of _chat.tabledata) {
                        const tableDatumData = JSON.parse(JSON.stringify(tableDatum))
                        if (_chat.tableList.length < _chat.showNumber) {
                            _chat.tableList.push(tableDatumData)
                            if (_chat.tableColumns.length === 0) {
                                const keys = Object.keys(tableDatumData)
                                for (const table_key of keys) {
                                    if (table_key !== 'time')_chat.tableColumns.push({
                                        visible: true,
                                        label: table_key,
                                        prop: table_key,
                                    })
                                }
                            }
                        } else {
                            break
                        }
                    }
                }
            },
            immediate: true,
            deep: true,
        },
    },

}
</script>
