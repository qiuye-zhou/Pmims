import request from '../util/request'

//登入
export function Login(data: any) {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}