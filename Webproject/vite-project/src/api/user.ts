import request from '../util/request'

export function Login(data: any) {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}