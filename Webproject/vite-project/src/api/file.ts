import request from '../util/request'

//用户参加活动提交文件
export function uploadAc(data: any) {
    return request({
        url: '/file/uploadac',
        method: 'POST',
        data
    })
}