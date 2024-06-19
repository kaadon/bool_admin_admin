import request from '@/utils/request'
import Vue from 'vue'

/**
 * 列表接口-Profile-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function listMemberProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.member.profile.index,
                       method: 'post',
                       data,
                   })
}

/**
 * 添加接口-Profile-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function addMemberProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.member.profile.add,
                       method: 'post',
                       data,
                   })
}

/**
 * 详情接口-Profile-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function findMemberProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.member.profile.find,
                       method: 'post',
                       data,
                   })
}

/**
 * 编辑接口-Profile-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function editMemberProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.member.profile.edit,
                       method: 'post',
                       data,
                   })
}

/**
 * 删除接口-Profile-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function deleteMemberProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.member.profile.delete,
                       method: 'post',
                       data,
                   })
}

/**
 * 状态接口-Profile-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function statusMemberProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.member.profile.status,
        method: 'post',
        data,
    })
}

/**
 * 参数接口-Profile-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function optionsMemberProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.member.profile.getOptions,
        method: 'post',
        data,
    })
}

/**
 * 判断邀请码是否存在-Profile-用户
 * @param {object} data - 参数对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export function inviterMemberProfile(data = {}) {
    return request({
        url: Vue.prototype.$api.member.profile.getInviter,
        method: 'post',
        data,
    })
}




