import request from '../util/request'

//admin获取用户信息列表
export function getuser_list() {
    return request({
        url: '/admin/getuser_list',
        method: 'POST',
    })
}

//admin获取所有的简易活动信息
export function getactiv_all() {
    return request({
        url: '/admin/getactiv_all',
        method: 'POST',
    })
}

//获取activ_id 的全部详细信息
export function getactivitywhole(data: any) {
    return request({
        url: '/admin/getactivitywhole',
        method: 'POST',
        data
    })
}

//查询所有参加某个活动的用户的有关信息
export function getjoin_activ_user(data: any) {
    return request({
        url: '/admin/getjoin_activ_user',
        method: 'POST',
        data
    })
}

//操作
//发布活动add_activ
export function add_activ(data: any) {
    return request({
        url: '/admin/add_activ',
        method: 'POST',
        data
    })
}

//echarts数据
//用户参加活动率(用户参加活动总数量 / 活动总数量*用户数量)——pie
export function getechartspie_useractiv() {
    return request({
        url: '/admin/getechartspie_useractiv',
        method: 'POST',
    })
}