
<template>
    <div>
        <qa-table
            :source='tableData'
            :columns='tableColumns'
            :selection='true'
            id='ListTable'
        >
        </qa-table>
    </div>
</template>

<script>
import qaTable from '@/components/QuickAdminTable/index.vue'

export default {
    name: 'ListTable',
    components: { qaTable },
    data: () => {
        return {
            tableData:[]
        }
    },
    watch:{
        listData:{
            handler(val){
                if (val.length > 0){
                    const listData = JSON.parse(JSON.stringify(val))
                    listData.sort((a,b)=>{
                        return b.time - a.time
                    })
                    this.tableData = listData
                }else {
                    const listData = JSON.parse(JSON.stringify(val))
                    listData.sort((a,b)=>{
                        return b.time - a.time
                    })
                    this.tableData = listData
                }
            },
            immediate:true,
            deep:true
        }
    },
    props: {
        tableColumns: {
            required: true,
            type: Array,
        },
        listData:{
            required: true,
            type: Array,
        }
    },

}
</script>
