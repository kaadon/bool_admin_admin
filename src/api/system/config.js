import request from '@/utils/request'
import Vue from 'vue'

// 查询参数列表
export function listConfig(data) {
    return request({
        url: Vue.prototype.$api.config.index,
        method: 'post',
        data
    })
}

// 修改参数列表
export function updateConfig (data) {
    return request({
        url: Vue.prototype.$api.config.update,
        method: 'post',
        data
    })
}

// 获取系统配置
export function getConfig () {
    return request({
        url: Vue.prototype.$api.config.getConfig,
        method: 'post',
    })
}
