import store from '@/common/store/index.js'
import { kToken, kLoginUrls } from '@/common/constant/constant.js'
import { base_url } from '@/common/config/config.js'
import { clearToLogin } from "@/common/utils/page.js"

export function request(url, data, method = "post", timeout = 30000) {
	const requestUrl = base_url + url 
	// #ifndef IRENT-PROD
	console.log("【请求开始】", requestUrl)
	console.log("【请求参数】\n", data)
	// #endif
	
	const header = {}
	const token = getApp().globalData.token
	if (token) {
		header["X-AUTH-SESSION"] = token
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: requestUrl,
			timeout: timeout,
			data: data,
			method: method,
			header: header,
			success: (res) => {
				const { data, statusCode, header } = res
				
				// #ifndef IRENT-PROD
				console.log("【请求结束】", requestUrl)
				console.log("【响应数据】\n", data)
				// #endif
				
				if (statusCode >= 200 && statusCode < 300 && data != null && data.code != null) {
					if (data.code === "BASE.000") {
						if (kLoginUrls.indexOf(url) !== -1) {
							const token = header["X-AUTH-SESSION"]
							console.log("token = ", token)
							getApp().globalData.token = token
							uni.setStorageSync(kToken, token)
						}
						resolve(data.data)
					} else if (data.code === "NOT_LOGIN") {
						clearToLogin()
						reject(data)
					} else {
						reject(data)
					}
				} else {
					const error = {
						code: -1,
						errMsg: "请求失败"
					}
					reject(error)
				}
			},
			fail: (err) => {
				// #ifndef IRENT-PROD
				console.log("【请求结束】", requestUrl)
				console.log("【响应错误】\n", err)
				// #endif
				
				const error = {
					code: -2,
					errMsg: err.errMsg != null ? err.errMsg : "网络异常，请检查网络设置"
				}
				reject(error)
			}
		})
	})
}

// 上传文件, Promise
export function uploadFile(url, filePath, name = 'file', formData = null) {
	return new Promise((resolve, reject) => {
		uploadFileCallBack({
			url: url,
			filePath: filePath,
			name: name,
			formData: formData,
			success: resolve,
			fail: reject
		})
	})
}

// 上传文件，回调，用于上传图片组件
export function uploadFileCallBack(params) {
	const requestUrl = base_url + params.url 
	// #ifndef IRENT-PROD
	console.log("【请求开始】", requestUrl)
	console.log("filePath =", params.filePath)
	// #endif
	
	const globalData = getApp().globalData
	const header = (params.header != null && typeof params.header === 'object') ?  params.header : {}
	const token = globalData.token
	if (token) {
		header["X-AUTH-SESSION"] = token
	}
	
	const person = globalData.person
	const empNo = person ? person.empNo : globalData.phone
	const formData = (params.formData != null && typeof params.formData === 'object') ? params.formData : {}
	formData["empNo"] = empNo
	formData["partyCode"] = empNo
	
	// #ifndef IRENT-PROD
	console.log("formData =", formData)
	// #endif

	const task = uni.uploadFile({
		url: requestUrl,
		filePath: params.filePath,
		name: params.name,
		formData: formData,
		header: header,
		success(res) {
			const { data, statusCode } = res
			
			// #ifndef IRENT-PROD
			console.log("【请求结束】", requestUrl)
			console.log("【响应数据】\n", data)
			// #endif
			
			if (statusCode >= 200 && statusCode < 300 && data != null) {
				const response = JSON.parse(data)
				
				// #ifndef IRENT-PROD
				console.log("【响应JSON数据】\n", response)
				// #endif
				
				if (response) {
					if (response.code === "BASE.000") {
						params.success(response.data)
					} else {
						const error = response
						error.errMsg = error.errMsg || "上传文件失败"
						params.fail(error)
					}
				} else {
					const error = {
						code: -1,
						errMsg: "上传文件失败"
					}
					params.fail(error)
				}
			} else {
				const error = {
					code: -1,
					errMsg: "上传文件失败"
				}
				params.fail(error)
			}
		},
		fail(err) {
			// #ifndef IRENT-PROD
			console.log("【请求结束】", requestUrl)
			console.log("【响应错误】\n", err)
			// #endif
			
			const error = {
				code: -2,
				errMsg: err.errMsg || "网络异常，请检查网络设置"
			}
			params.fail(error)
		}
	})
	
	if (params.progress) {
		task.onProgressUpdate(res => {
			params.progress(res.progress)
		})
	}
	
	return task
}
