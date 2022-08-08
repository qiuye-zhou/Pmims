import request from '../util/request'

//获取用户信息
export function getUser(data: any) {
    return request({
        url: '/users/getuser',
        method: 'POST',
        data
    })
}

//获取个人用户的所有获奖信息
export function getawards(data: any) {
    return request({
        url: '/users/getawards',
        method: 'POST',
        data
    })
}

//获取个人的积分排名
export function getintegral_rank(data: any) {
    return request({
        url: '/users/getintegral_rank',
        method: 'POST',
        data
    })
}

//获取所有的活动信息，以及个人用户参加了的活动的信息
export function getactivity(data: any) {
    return request({
        url: '/users/getactivity',
        method: 'POST',
        data
    })
}

//获取activ_id 的全部详细信息
export function getactivitywhole(data: any) {
    return request({
        url: '/users/getactivitywhole',
        method: 'POST',
        data
    })
}

//获取个人用户的所有评价信息
export function getactiv_evalue(data: any) {
    return request({
        url: '/users/getactiv_evalue',
        method: 'POST',
        data
    })
}

//操作
//用户参加某个活动
export function join_active(data: any) {
    return request({
        url: '/users/join_active',
        method: 'POST',
        data
    })
}

//用户活动评价(活动结束后评价)
export function activ_evaluate(data: any) {
    return request({
        url: '/users/activ_evaluate',
        method: 'POST',
        data
    })
}

//用户提交审核
export function subprize(data: any) {
    return request({
        url: '/users/subprize',
        method: 'POST',
        data
    })
}

//echarts数据
//活动总数量/该用户参加活动的数量——pie
export function getechartspie(data: any) {
    return request({
        url: '/users/getechartspie',
        method: 'POST',
        data
    })
}