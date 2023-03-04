<template>
    <div>
        <!-- 追加关联模型 -->
        <template v-if="addForm.subSimple.length > 0">
            <el-divider>一对一关联</el-divider>
            <el-form :model="addForm" ref="addForm">
                <el-table :data="addForm.subSimple" max-height="200px">
                    <el-table-column label="序号" type="index" width="150" align="center"> </el-table-column>
                    <el-table-column label="请选择关联表" width="200" align="center">
                        <template slot-scope="scope">
                            <el-form-item>
                                <el-select v-model="scope.row.table_name" placeholder="请选择" size="small" @change="subTableChange(1,scope.$index, scope.row.table_name)" @blur="addFormChange">
                                    <el-option v-for="item in modelOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="描述" width="150" align="center"> 
                        <template slot-scope="scope">
                            <el-form-item :prop="'subSimple.' + scope.$index + '.remark'">
                                <el-input v-model="scope.row.remark" size="small"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="请选择关联类型" width="150" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'subSimple.' + scope.$index + '.relation_type'">
                                <el-select v-model="scope.row.relation_type" placeholder="请选择" size="small" @blur="addFormChange">
                                    <el-option v-for="item in DictModelReationOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="关联外键" width="150" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'subSimple.' + scope.$index + '.foreign_key'">
                                <el-select v-model="scope.row.foreign_key" placeholder="请选择" size="small" @blur="addFormChange">
                                    <el-option
                                        v-for="item in scope.row.relation_type === 'belongsTo' ? foreignKeyOptions : primaryKeyOptions[scope.row.table_name]"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>

                    <el-table-column label="关联主键" width="150" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'subSimple.' + scope.$index + '.primary_key'">
                                <el-select v-model="scope.row.primary_key" placeholder="请选择" size="small" @blur="addFormChange">
                                    <el-option
                                        v-for="item in scope.row.relation_type !== 'belongsTo' ? foreignKeyOptions : primaryKeyOptions[scope.row.table_name]"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="请选择显示字段" width="200" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'subSimple.' + scope.$index + '.showfieldlist'">
                                <el-select
                                    v-model="scope.row.showfieldlist"
                                    placeholder="请选择"
                                    size="small"
                                    multiple
                                    :collapse-tags="true"
                                    @blur="addFormChange"
                                    @visible-change="visibleChange($event, scope.row)"
                                    @change="selectedFieldChange(scope.row.showfieldlist, scope.$index)"
                                >
                                    <el-option v-for="item in primaryKeyOptions[scope.row.table_name]" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>


                     <el-table-column label="请选择selectpage的label值" width="200" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'subSimple.' + scope.$index + '.selectpageLabel'">
                                <el-select
                                    v-model="scope.row.selectpageLabel"
                                    placeholder="请选择"
                                    size="small"
                                    :collapse-tags="true"
                                    @blur="addFormChange"
                                >
                                    <el-option v-for="item in primaryKeyOptions[scope.row.table_name]" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>



                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" icon="el-icon-view" @click="detailSubShow(scope.row, scope.$index)" :disabled="scope.row.showfieldlist.length === 0">详情</el-button>
                            <el-button size="mini" type="text" icon="el-icon-delete" @click="del(scope.row, scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </template>




         <!-- 追加一对多关联模型 -->
        <template v-if="addForm.moreSimple.length > 0">
            <el-divider>一对多关联</el-divider>
            <el-form :model="addForm" ref="addForm">
                <el-table :data="addForm.moreSimple" max-height="200px">
                    <el-table-column label="序号" type="index" width="150" align="center"> </el-table-column>
                    <el-table-column label="请选择关联表" width="200" align="center">
                        <template slot-scope="scope">
                            <el-form-item>
                                <el-select v-model="scope.row.table_name" placeholder="请选择" size="small" @change="subTableChange(2,scope.$index, scope.row.table_name)" @blur="addFormChange">
                                    <el-option v-for="item in modelOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="描述" width="150" align="center"> 
                        <template slot-scope="scope">
                            <el-form-item :prop="'moreSimple.' + scope.$index + '.remark'">
                                <el-input v-model="scope.row.remark" size="small"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="请选择关联类型" width="150" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'moreSimple.' + scope.$index + '.relation_type'">
                                <el-select v-model="scope.row.relation_type" placeholder="请选择" size="small" @blur="addFormChange">
                                    <el-option v-for="item in DictModelMoreReationOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="关联外键" width="150" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'moreSimple.' + scope.$index + '.foreign_key'">
                                <el-select v-model="scope.row.foreign_key" placeholder="请选择" size="small" @blur="addFormChange">
                                    <el-option
                                        v-for="item in  primaryKeyOptions[scope.row.table_name]"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="关联主键" width="150" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'moreSimple.' + scope.$index + '.primary_key'">
                                <el-select v-model="scope.row.primary_key" placeholder="请选择" size="small" @blur="addFormChange">
                                    <el-option
                                        v-for="item in foreignKeyOptions "
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
             
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" icon="el-icon-view" @click="detailMoreShow(scope.row, scope.$index)" :disabled="scope.row.table_name.length === 0">详情</el-button>
                            <el-button size="mini" type="text" icon="el-icon-delete" @click="delMore(scope.row, scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </template>





        <el-form-item label="追加关联表">
            <el-button type="primary" plain size="mini" icon="el-icon-document-add" @click="addModel(1)"> 追加一对一关联表</el-button>
            <el-button type="primary" plain size="mini" icon="el-icon-document-add" @click="addModel(2)"> 追加一对多关联表</el-button>
        </el-form-item>

        <!-- 一对一附表详情 -->
        <el-dialog width="60%" title="一对一关联表详情" :visible.sync="innerVisible" append-to-body>
            <el-tabs v-model="activeName" @tab-click="detailSubTabClick">
                <el-tab-pane v-for="item in selectedSubShowFiledEdit" :key="item.table" :label="item.table" :name="item.table">
                    <EditModelCom :editDetail="item.fieldlist" :loading="loading" :is_subModel="{ result: true, table: item.table }" @editFormChange="editFormChange" />
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

        <!-- 一对多附表详情 -->
        <el-dialog width="60%" title="一对多关联表详情" :visible.sync="moreTableVisible" append-to-body>
            <el-tabs v-model="moreActiveName" @tab-click="detailSubTabClick">
                <el-tab-pane v-for="item in moreSelectedSubShowFiledEdit" :key="item.table" :label="item.table" :name="item.table">
                    <MoreEditModelCom :editDetail="item.fieldlist" :loading="loading" :is_subModel="{ result: true, table: item.table }" @editMoreFormChange="editMoreFormChangeIn" />
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

    </div>

    
</template>

<script>
import { listTable, subTable } from '@/api/tool/online'
import EditModelCom from './EditModelCom'
import MoreEditModelCom from './MoreEditModelCom'
export default {
    name: 'AddModelCom',
    components: { EditModelCom ,MoreEditModelCom},
    props: {
        // 主表详情
        mainModelDetail: {
            type: Array,
            default: [],
        },
        // 二次编辑的关系表列表数据
        secondaryEditTableData: {
            type: Array,
            default: [],
        },
        secondaryEditMoreTableData:{
            type: Array,
            default: [],
        }
    },
    data() {
        return {
            // 关联表
            modelOptions: [],
            // 关联主键、显示字段
            primaryKeyOptions: {},
            // 关联表类型
            DictModelReationOptions: this.$init.DictModelReationOptions,
            DictModelMoreReationOptions:[ { label: '一对多', value: 'oneToMore' },],
            addForm: {
                // 已勾选的附表简要信息
                subSimple: [],
                moreSimple:[],
            },
            innerVisible: false,
            moreTableVisible: false,
            activeName: '0',
            moreActiveName: '0',
            // 附表全部信息：已勾选
            selectedSub: [],
            // 附表显示字段：已选择
            selectedSubShowFiled: [],
            // 附表显示字段：已选择 需要编辑
            selectedSubShowFiledEdit: [],
            // 接收到的已编辑字段
            selectedSubShowFiledEditAcceptData: {},


            // 一对多附表全部信息：已勾选
            moreSelectedSub: [],
            // 附表显示字段：已选择
            moreSelectedSubShowFiled: [],
            // 附表显示字段：已选择 需要编辑
            moreSelectedSubShowFiledEdit: [],
            // 接收到的已编辑字段
            moreSelectedSubShowFiledEditAcceptData: {},

            loading: false,
        }
    },
    watch: {
        // 二次编辑 回显
        secondaryEditTableData: {
            handler(arr) {
                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        this.$set(this.addForm.subSimple, i, {
                            fieldlist: Object.values(arr[i].fieldlist),
                            foreign_key: arr[i].foreign_key,
                            primary_key: arr[i].primary_key,
                            relation_type: arr[i].relation_type,
                            showfieldlist: Object.values(arr[i].showfieldlist),
                            selectpageLabel : arr[i].selectpageLabel,
                            remark: arr[i].remark,
                            table_name: arr[i].table_name,
                        })

                        subTable({ table: arr[i].table_name })
                            .then(response => {
                                const result = response.data.fieldlist.map(item => {
                                    return {
                                        label: item.field,
                                        value: item.field,
                                    }
                                })
                                this.$set(this.primaryKeyOptions, arr[i].table_name, result)

                                // 关联表全部信息，等待过滤需要编辑的字段
                                this.selectedSub[i] = {
                                    table: arr[i].table_name,
                                    fieldlist: response.data.fieldlist,
                                }
                            })
                            .finally(() => {
                                this.loading = false
                            })

                        // 回显：二次编辑下的已选显示字段
                        this.selectedSubShowFiledEdit[i] = {
                            table: arr[i]['table_name'],
                            fieldlist: Object.values(arr[i]['fieldlist']),
                        }
                    }
                }
            },
            immediate: true,
        },
         // 二次编辑 回显
        secondaryEditMoreTableData: {
            handler(arr) {
                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        this.$set(this.addForm.moreSimple, i, {
                            fieldlist: Object.values(arr[i].fieldlist),
                            foreign_key: arr[i].foreign_key,
                            primary_key: arr[i].primary_key,
                            relation_type: arr[i].relation_type,
                            showfieldlist: Object.values(arr[i].showfieldlist),
                            remark: arr[i].remark,
                            table_name: arr[i].table_name,
                        })

                        subTable({ table: arr[i].table_name })
                            .then(response => {
                                const result = response.data.fieldlist.map(item => {
                                    return {
                                        label: item.field,
                                        value: item.field,
                                    }
                                })
                              
                                // 关联表全部信息，等待过滤需要编辑的字段
                                this.moreSelectedSub[i] = {
                                    table: arr[i].table_name,
                                    fieldlist: response.data.fieldlist,
                                }
                            })
                            .finally(() => {
                                this.loading = false
                            })

                        // 回显：二次编辑下的已选显示字段
                        this.moreSelectedSubShowFiledEdit[i] = {
                            table: arr[i]['table_name'],
                            fieldlist: Object.values(arr[i]['fieldlist']),
                        }
                    }
                }
            },
            immediate: true,
        },
    },
    computed: {
        // 外键
        foreignKeyOptions() {
            return this.mainModelDetail.map(item => {
                return {
                    label: item.field,
                    value: item.field,
                }
            })
        },
    },
    created() {
        this.getListTables()
    },
    methods: {
        // 获取所有表名
        async getListTables() {
            await listTable().then(response => {
                this.modelOptions = Object.keys(response.data).map(item => {
                    return {
                        label: item,
                        value: item,
                    }
                })
            })
        },

        // 获取关联表
        async subTableChange(type,index, table) {
            this.loading = true

            await subTable({ table })
                .then(response => {
                    const result = response.data.fieldlist.map(item => {
                        return {
                            label: item.field,
                            value: item.field,
                        }
                    })

                    // 关联表变化重置操作
                    this.reset(type,index)
                    this.$set(this.primaryKeyOptions, table, result)

                    // 关联表全部信息，等待过滤需要编辑的字段
                    this.selectedSub[index] = {
                        table,
                        fieldlist: response.data.fieldlist,
                    }

                    var fieldlist= response.data.fieldlist;
                    if(type==2){
                        //this.selectedSubShowFiled[index] = val
                        this.moreSelectedSubShowFiledEdit[index] = {
                            table: table,
                            fieldlist,
                        }
                    }
                    console.log("================",this.moreSelectedSubShowFiledEdit);

                    
                })
                .finally(() => {
                    this.loading = false
                })
        },

        // 添加关联表
        addModel(type) {
            if(type==1){
             this.addForm.subSimple.push({
                table_name: '',
                relation_type: '',
                foreign_key: '',
                primary_key: '',
                remark:'',
                showfieldlist: [],
                selectpageLabel : [],
                })
            }else{
                this.addForm.moreSimple.push({
                table_name: '',
                relation_type: '',
                foreign_key: '',
                primary_key: '',
                remark:'',
                showfieldlist: [],
                })
            }
        
        },

        // 删除附表
        del(row, index) {
            this.$confirm(`是否确认删除表编号为"${index + 1}"的数据项?`, '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.reset(1,index)
                    this.addForm.subSimple.splice(index, 1)
                    // 删除组件内已编辑字段信息
                    delete this.selectedSubShowFiledEditAcceptData[row.table_name]

                    // 编辑表单重置
                    this.selectedSubShowFiledEdit.splice(index, 1)
                })
                .catch(() => {})
        },

        // 删除一对多附表
        delMore(row, index) {
            this.$confirm(`是否确认删除表编号为"${index + 1}"的数据项?`, '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.reset(2,index)
                    this.addForm.moreSimple.splice(index, 1)
                    // 删除组件内已编辑字段信息
                    delete this.moreSelectedSubShowFiledEditAcceptData[row.table_name]

                    // 编辑表单重置
                    this.moreSelectedSubShowFiledEdit.splice(index, 1)
                })
                .catch(() => {})
        },

        addFormChange() {
            this.$emit('addFormChange', this.addForm)
        },

        //规避：不编辑任何字短情形：附表显示字段相关值获取
        visibleChange(visible, row) {
            if (!visible) {
                this.innerVisible = true
                this.activeName = row.table_name
            }
        },

        // 监听附表字段编辑
        editFormChange(data) {
            const sub_simple = this.addForm.subSimple
            const accrpt_data = this.selectedSubShowFiledEditAcceptData
            accrpt_data[data.table] = data.editDetail

            for (const key in accrpt_data) {
                for (const key2 in sub_simple) {
                    if (key === sub_simple[key2].table_name) {
                        sub_simple[key2].fieldlist = accrpt_data[key]
                    }
                }
            }
            this.$emit('editFormChange', this.addForm)
        },
            // 监听附表字段编辑
        editMoreFormChangeIn(data) {
            const more_simple = this.addForm.moreSimple
            const accrpt_data = this.moreSelectedSubShowFiledEditAcceptData
            accrpt_data[data.table] = data.editDetail

            for (const key in accrpt_data) {
                for (const key2 in more_simple) {
                    if (key === more_simple[key2].table_name) {
                        more_simple[key2].fieldlist = accrpt_data[key]
                    }
                }
            }
            console.log("+++++moreedit++++",more_simple)
            this.$emit('editMoreFormChange', more_simple)
            console.log("+++++editMoreFormChange 已提交++++")
        },

        // 附表详情弹窗
        detailSubShow(row, index) {
            this.innerVisible = true
            this.activeName = row.table_name
        },
        // 附表详情弹窗
        detailMoreShow(row, index) {
            this.moreTableVisible = true
            this.moreActiveName = row.table_name
        },


        // 显示字段：已选择的
        selectedFieldChange(val, index) {
            this.selectedSubShowFiled[index] = val

            if (val.length === 0) return
            // 过滤出需要编辑的字段
            const select_table = this.selectedSub[index].table
            const fieldlist = this.selectedSub[index].fieldlist.filter(item => {
                if (val.includes(item.field)) return true
                return false
            })
            this.selectedSubShowFiledEdit[index] = {
                table: select_table,
                fieldlist,
            }
        },

        detailSubTabClick(tab) {},

        // 重置 显示字段：已选择 界面显示
        reset(type,index) {
            if(type==1){
                this.addForm.subSimple[index].showfieldlist = []
            }else{
                this.addForm.moreSimple[index].showfieldlist = []
            }
       
        },

        close() {
            this.addForm.subSimple = []
            this.addForm.moreSimple = []

            this.subModelDetail = []
        },
    },
}
</script>

<style lang="scss" scoped>
//解决表格内表单不居中问题
::v-deep .el-form-item {
    margin-bottom: 0;
}
</style>
