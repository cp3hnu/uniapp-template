// 页面相关的
import { kToken, kPhone, kLogoutEvent } from '@/common/constant/constant.js'


export function showLoading(title = "加载中") {
	uni.showLoading({
		mask: true,
		title: title
	})
}

export function hideLoading() {
	uni.hideLoading()
}

export function showToast(title, duration = 3000) {
	uni.showToast({
		title: title,
		icon: "none",
		mask: false,
		duration: duration
	});
}

export function showSuccessToast(title) {
	uni.showToast({
		title: title,
		icon: "success",
		mask: false,
		duration: 3000
	});
}

// 判断是否登录
export function isLogined() {
	const globalData = getApp().globalData
	return globalData.phone && globalData.token
}

// 跳转到登录界面
export function gotoLogin() {
	return new Promise((resolve, reject) => {
		if (isLogined()) {
			resolve(true)
		} else {
			uni.navigateTo({
				url: "/pages/login/login"
			})
		}
	})
}

// 清除然后登录
export function clearToLogin(isTokenInvalid = true) {
	const globalData = getApp().globalData
	globalData.phone = ""
	globalData.token = ""
	
	uni.removeStorageSync(kToken)
	uni.removeStorageSync(kPhone)
	
	uni.$emit(kLogoutEvent)
	
	if (isTokenInvalid) {
		uni.redirectTo({
			url: "/pages/login/login"
		})
	}
}

// 实验版本，自定义modal
export function showModal(data) {
	this.$refs["dialog-wrapper"].showModal(data)
}