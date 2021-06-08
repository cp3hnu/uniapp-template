import { request, uploadFile } from './request.js'

// 登录
export function loginReq(data) {
	return request("/client/applet/mobileLogin", data)
}

// --------------------------- 上传文件 -------------------------------

// 上传图片
export function uploadCommonPicReq(filePath) {
	return uploadFile("/ossfile/annexFileSave", filePath)
}
