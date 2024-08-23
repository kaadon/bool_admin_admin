import request from '@/utils/request'
import Vue from 'vue'

// 获取路由
export const getRouters = () => {
    return request({
        url: Vue.prototype.$api.route.initIndex,
        method: 'post'
    })
}

export const downloadSystemFile = (params) => {
    return request({
        url: Vue.prototype.$api.admin.download,
        method: 'get',
        params
    })
}
