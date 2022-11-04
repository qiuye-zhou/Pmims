import request from '../util/request'

//用户参加活动提交文件
export function uploadAc(data: any) {
    return request({
        url: '/file/uploadac',
        method: 'POST',
        data
    })
}

//用户提交审核提交文件
export function uploadEx(data: any) {
    return request({
        url: '/file/uploadex',
        method: 'POST',
        data
    }) 
}

//用户提交审核提交文件
export function uploadimage(data: any) {
    return request({
        url: '/file/uploadimage',
        method: 'POST',
        data
    }) 
}