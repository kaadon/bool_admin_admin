export * as member from './apiModules/member'
export * as merchant from './apiModules/merchant'
export * as example from './apiModules/example'
export const menu = {
    adminIndex: '/admin/system.menu/adminIndex',
    index: '/admin/system.menu/index',
    add: '/admin/system.menu/add',
    find: '/admin/system.menu/find',
    edit: '/admin/system.menu/edit',
    delete: '/admin/system.menu/delete',
    status: '/admin/system.menu/status',
}
export const role = {
    index: '/admin/system.role/index',
    add: '/admin/system.role/add',
    find: '/admin/system.role/find',
    edit: '/admin/system.role/edit',
    delete: '/admin/system.role/delete',
    status: '/admin/system.role/status',
    authData: '/admin/system.role/authData',
    authGroup: '/admin/system.role/authGroup',
    selectList: '/admin/system.role/selectList',
}
export const admin = {
    index: '/admin/system.admin/index',
    add: '/admin/system.admin/add',
    find: '/admin/system.admin/find',
    edit: '/admin/system.admin/edit',
    delete: '/admin/system.admin/delete',
    status: '/admin/system.admin/status',
}
export const file = {
    index: '/admin/system.files/index',
    delete: '/admin/system.files/delete',
}
export const online = {
    index: '/admin/onlinecurd.index/index',
    getTables: '/admin/onlinecurd.index/getTables',
    getMainTableRow: '/admin/onlinecurd.index/getMainTableRow',
    getSubTableRow: '/admin/onlinecurd.index/getSubTableRow',
    save: '/admin/onlinecurd.index/save',
    status: '/admin/onlinecurd.index/status',
}

export const upload = {
    upload: '/admin/ajax/upload',
}

export const config = {
    index: '/admin/system.config/index',
    update: '/admin/system.config/update',
    getConfig: '/admin/ajax/getConfig',
    add: '/admin/system.config/add',
    getConfigTypes: '/admin/system.config/getConfigTypes',
}

export const log = {
    index: '/admin/system.log/index',
}

export const route = {
    initIndex: '/admin/ajax/initIndex',
}

export const login = {
    index: '/admin/passport/index',
    register: '/admin/passport/register',
    userinfo: '/admin/passport/userinfo',
    logout: '/admin/passport/logout',
    update: '/admin/passport/update',
    getCaptcha: '/admin/ajax/getCaptcha',
}
