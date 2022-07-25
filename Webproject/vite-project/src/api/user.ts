import request from '../util/request'

export function cs(data: any) {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}