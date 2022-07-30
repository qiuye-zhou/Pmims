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
        url: '/users/getactivity',
        method: 'POST',
        data
    })
}