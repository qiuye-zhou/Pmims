import request from '../util/request'

//通过id查用户名
export function getUsername(data: any) {
    return request({
        url: '/getUsername',
        method: 'POST',
        data
    })
}