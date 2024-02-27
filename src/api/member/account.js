import request from '@/utils/request'
import Vue     from 'vue'

/**
 * 列表接口-Account-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function listMemberAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.member.account.index,
                       method: 'post',
                       data,
                   })
}

/**
 * 添加接口-Account-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function addMemberAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.member.account.add,
                       method: 'post',
                       data,
                   })
}

/**
 * 详情接口-Account-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function findMemberAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.member.account.find,
                       method: 'post',
                       data,
                   })
}

/**
 * 编辑接口-Account-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function editMemberAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.member.account.edit,
                       method: 'post',
                       data,
                   })
}

/**
 * 删除接口-Account-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function deleteMemberAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.member.account.delete,
                       method: 'post',
                       data,
                   })
}

/**
 * 状态接口-Account-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function statusMemberAccount(data = {}) {
    return request({
                       url   : Vue.prototype.$api.member.account.status,
                       method: 'post',
                       data,
                   })
}




