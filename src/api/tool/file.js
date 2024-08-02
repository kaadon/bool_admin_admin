import request from '@/utils/request'
import Vue from 'vue'

/**
 * 列表
 * @returns
 * @param params
 */
export function apiFilesIndex (params) {
    return request({
        url: Vue.prototype.$api.file.index,
        method: 'post',
        params
    })
}

/**
 * 删除
 * @returns
 * @param params
 */
export function apiFilesDelete (params) {
    return request({
        url: Vue.prototype.$api.file.delete,
        method: 'post',
        params
    })
}
