<template>
    <div>
        <el-popover trigger="hover" placement="top" v-if="value" width="600" :justify="'space-between'">
            <el-row :gutter="4" v-for="(item,index) in value" :key="index"
                    style="margin-bottom: 5px;border-bottom:0.1px rgba(96,118,241,0.36) dashed"
            >
                <el-col :span="6">
                    <div class="grid-content">{{ item?.label || '-' }}:</div>
                </el-col>
                <el-col :span="18">
                    <div class="grid-content demo-image__preview" v-if="item.type === 'image'">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="item?.value || '-'"
                            :preview-src-list="[item?.value || '-']"
                        >
                        </el-image>
                    </div>
                    <div class="grid-content bg-purple-light" v-else>{{ item?.value || '-' }}</div>
                </el-col>
            </el-row>
            <div slot="reference" class="name-wrapper">
                <el-tag>查看</el-tag>
            </div>
        </el-popover>
        <p v-else>-</p>
    </div>
</template>

<script>
export default {
    name: 'QuickAdminJsonPopover',
    props: {
        value: {
            required: true,
            type: Array,
            default: () => {
                return [
                    {
                        label: '图片',
                        value: 'https://www.moack.co.kr/index/assets/img/logo.png',
                        type: 'image',
                    },
                    {
                        label: '文字',
                        value: '测试文字',
                        type: 'text',
                    },
                    {
                        label: '视频',
                        value: '视频',
                        type: 'video',
                    },
                    {
                        label: '音频',
                        value: '音频',
                        type: 'audio',
                    }
                ]
            },
        },
    },
}
</script>
