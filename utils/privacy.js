// 隐私权限管理
// 申请权限Promise
export const systemPrivacy = (scope, title, desc, silent = false) => {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success: (res) => {
				if (res.authSetting[scope]) {
					// 已授权
					resolve()
				} else {
					// 去申请授权
					resolve(PrivacyAuthorize(scope, title, desc, silent))
				}
			},
			fail: () => {
				// api调用失败
				const error = Error('api')
				reject(error)
			},
		})
	})
};

// 申请授权
const PrivacyAuthorize = (scope, title, desc, silent) => {
	return new Promise((resolve, reject) => {
		uni.authorize({
			scope: scope,
			success: () => {
				// 用户已授权
				resolve()
			}, 
			fail: () => {
				// 用户拒绝了
				if (silent) {
					// 不弹框
					const error = Error('cancel')
					reject(error)
				}
				else {
					// 弹框
					resolve(privacyShowModel(scope, title, desc))
				}
			},
		})
	})
}

// 弹框设置
const privacyShowModel = (scope, title, desc) => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: title,
			content: desc,
			cancelColor: '#848484',
			confirmColor: '#128DEB',
			confirmText: '设置',
			success: (res) => {
				// 用户去设置
				if (res.confirm) {
				    resolve(privacyOpenSetting(scope))
				} else if (res.cancel) {
				    // 用户点击取消
					const error = Error('cancel')
					reject(error)
				}
			},
			fail: () => {
				// api调用失败
				const error = Error('api')
				reject(error)
			}
		})
	})
}

// 打开设置去授权
const privacyOpenSetting = (scope) => {
	return new Promise((resolve, reject) => {
		uni.openSetting({
			success: (res) => {
				if (res.authSetting[scope]) {
					// 用户授权
					resolve()
				} else {
					// 用户取消授权
					const error = Error('cancel')
					reject(error)
				}
			},
			fail: () => {
				// api调用失败
				const error = Error('api')
				reject(error)
			}
		})
	})
}



