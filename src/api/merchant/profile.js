import request from '@/utils/request'
import Vue from 'vue'

/**
 * 列表接口-Profile-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function listMerchantProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.merchant.profile.index,
                       method: 'post',
                       data,
                   })
}

/**
 * 添加接口-Profile-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function addMerchantProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.merchant.profile.add,
                       method: 'post',
                       data,
                   })
}

/**
 * 详情接口-Profile-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function findMerchantProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.merchant.profile.find,
                       method: 'post',
                       data,
                   })
}

/**
 * 编辑接口-Profile-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function editMerchantProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.merchant.profile.edit,
                       method: 'post',
                       data,
                   })
}

/**
 * 删除接口-Profile-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function deleteMerchantProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.merchant.profile.delete,
                       method: 'post',
                       data,
                   })
}

/**
 * 状态接口-Profile-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function statusMerchantProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.merchant.profile.status,
                       method: 'post',
                       data,
                   })
}

/**
 * 参数接口-Profile-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function optionsMerchantProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.merchant.profile.getOptions,
        method: 'post',
        data,
    })
}

/**
 * 代理接口-Profile-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function agentMerchantProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.merchant.profile.getAgent,
        method: 'post',
        data,
    })
}




