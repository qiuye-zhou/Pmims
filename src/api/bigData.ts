import request from '../util/request'

// 个人大数据接口
export function getPerInfo(data: any) {
    return request({
        url: '/bigdata/getPerInfo',
        method: 'POST',
        data
    })
}

export function getactivjoinbar(data: any) {
    return request({
        url: '/bigdata/getactivjoinbar',
        method: 'POST',
        data
    })
}