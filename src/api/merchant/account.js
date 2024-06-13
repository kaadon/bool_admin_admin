import request from '@/utils/request'
import Vue     from 'vue'

/**
 * 列表接口-Account-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function listMerchantAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.merchant.account.index,
                       method: 'post',
                       data,
                   })
}

/**
 * 添加接口-Account-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function addMerchantAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.merchant.account.add,
                       method: 'post',
                       data,
                   })
}

/**
 * 详情接口-Account-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function findMerchantAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.merchant.account.find,
                       method: 'post',
                       data,
                   })
}

/**
 * 编辑接口-Account-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function editMerchantAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.merchant.account.edit,
                       method: 'post',
                       data,
                   })
}

/**
 * 删除接口-Account-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function deleteMerchantAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.merchant.account.delete,
                       method: 'post',
                       data,
                   })
}

/**
 * 状态接口-Account-代理
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function statusMerchantAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.merchant.account.status,
                       method: 'post',
                       data,
                   })
}




