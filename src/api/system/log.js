import request from '@/utils/request'
import Vue from 'vue'

// 查询操作日志列表
export function list(data) {
    return request({
        url: Vue.prototype.$api.log.index,
        method: 'post',
        data
    })
}

// 删除操作日志
export function delOperlog () {
    return request({
        url: '',
        method: 'post'
    })
}

// 清空操作日志
export function cleanOperlog () {
    return request({
        url: '',
        method: 'post'
    })
}

// 导出操作日志
export function exportOperlog(data) {
    return request({
        url: '',
        method: 'post',
        data
    })
}
