// 页面相关的
import { kToken, kPhone, kAuthType, kPerson, kLogoutEvent, kCancelTextColor, kMainTextColor } from '@/common/constant/constant.js'
import { registerYuncReq } from '@/common/api/api.js'

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
			uni.showModal({
				title: "温馨提示",
				content: "您即将进入自由职业者签约流程，签约成功后即可承接平台中企业指定的任务啦！为提供更优质的服务，请您先行登录！",
				cancelColor: kCancelTextColor,
				confirmColor: kMainTextColor,
				confirmText: '登录',
				success: (res) => {
					// 登录
					if (res.confirm) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					} 
				}
			})
		}
	})
}

// 清除然后登录
export function clearToLogin(isTokenInvalid = true) {
	const globalData = getApp().globalData
	globalData.phone = ""
	globalData.authType = ""
	globalData.person = null
	globalData.token = ""
	
	uni.removeStorageSync(kToken)
	uni.removeStorageSync(kPhone)
	uni.removeStorageSync(kAuthType)
	uni.removeStorageSync(kPerson)
	
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

// 登录后的跳转
export const doAuthNavigation = (data) => {
	const app = getApp()

	const person = data.person
	uni.setStorageSync(kPerson, person)
	uni.setStorageSync(kPhone, person.mobile)
	uni.setStorageSync(kAuthType, person.authType)
	uni.setStorageSync(kEmpNo, person.empNo)
	
	app.globalData.person = person
	app.globalData.employeeName = person.empName
	app.globalData.idcard = person.idcard
	app.globalData.employeeCardNo = person.accountNo
	app.globalData.reservePhone = person.reservePhone
	app.globalData.mobile = person.mobile
	app.globalData.empNo = person.empNo
	
	uni.navigateBack({
		delta: 1
	})
	// // 保存4要素信息
	// if (data.nextStep === "2" || data.nextStep === "4" || data.nextStep === "5" || data.nextStep === "9") {
	// 	app.globalData.employeeName = data.empName
	// 	app.globalData.idcard = data.idcard
	// 	app.globalData.employeeCardNo = data.accountNo
	// 	app.globalData.reservePhone = data.reservePhone
	// }

	// if (data.nextStep === "1") {
	// 	uni.navigateTo({
	// 		url: `/pages/home/evaluation?source=0&merchantNo=${data.merchantNo}`,
	// 	})
	// } else if (data.nextStep === "2") {
	// 	uni.navigateTo({
	// 		url: `/pages/home/verification?merchantNo=${data.merchantNo}&name=${data.empName}&idCard=${data.idcard}&cardNo=${data.accountNo}&phone=${data.reservePhone}`,
	// 	})
	// } else if (data.nextStep === "3") {
	// 	uni.navigateTo({
	// 		url: `/pages/home/id-upload?merchantNo=${data.merchantNo}&isYunCai=${false}`,
	// 	})
	// } else if (data.nextStep === "4") {
		
	// 	uni.setStorageSync('sign-item', {
	// 		merchantNo: data.merchantNo,
	// 		taxNo: data.taxList[0].taxNo,
	// 		contactMobile: data.taxList[0].contactMobile,
	// 		taxName: data.taxList[0].taxName,
	// 		reservePhone: data.reservePhone,
	// 		signetUrlShow: data.taxList[0].signetUrlShow,
	// 		trusteeIdCard: data.taxList[0].trusteeIdCard,
	// 		trusteeMobile: data.taxList[0].trusteeMobile,
	// 		trusteeName: data.taxList[0].trusteeName,
	// 		licenseNo: data.taxList[0].licenseNo,
	// 		trusteeTimeEnd: data.taxList[0].trusteeTimeEnd,
	// 		taxShortName: data.taxList[0].taxShortName,
	// 		sideAgreementUrl: data.taxList[0].sideAgreementUrl,
	// 		sideAgreementUrlShow: data.taxList[0].sideAgreementUrlShow,
	// 		accountNo: data.accountNo
	// 	})

	// 	uni.navigateTo({
	// 		url: "/pages/protocol/sign?isSign=1",
	// 	})
	// } else if (data.nextStep === "5") {
	// 	uni.navigateTo({
	// 		url: `../merchantCheckList/merchantCheckList?merchantNo=${data.merchantNo}`,
	// 	})
	// 	app.globalData.checkMerchantList = data.taxList
	// } else if (data.nextStep === "9") {
	// 	uni.switchTab({
	// 		url: '/pages/home/home',
	// 	})
	// }
}

// 云财同步注册
export const registerYunc = (regYuncInfo) => { 
	const {
		empName,
		idcard,
		mobile,
		idcardFront,
		idcardBack,
		signDate,
		invalidDate,
		address
	} = regYuncInfo

	showLoading()
	console.log(regYuncInfo)
	registerYuncReq( {
		empName: empName,
		idcard: idcard,
		idcardFront: idcardFront,
		idcardBack: idcardBack,
		reservePhone: mobile,
		signDate: signDate,
		invalidDate: invalidDate,
		address: address,
		wxOpenId: getApp().globalData.wxOpenId,
		empNo: getApp().globalData.person.empNo
	}).then((data) => {
		debugger
		hideLoading()
		// 跳转
		const token = data
		console.log("gotoYCS", token)
		uni.navigateToMiniProgram({
			appId: "wx4105832d85372be4", // "wx456721c015491920",
			path: "/pages/home/home",
			extraData: {
				iRentToken: token,
				industryName: ""
			},
			envVersion: "trial" // develop（开发版），trial（体验版），release（正式版）
		})
	}).catch((error) => {
		debugger
		hideLoading()
		showToast(error.errMsg)
		
		setTimeout(() => {
			uni.switchTab({
				url: '../home/home',
			})
		}, 4000)
	})
}
