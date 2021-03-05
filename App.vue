<script>
	import { kToken, kPhone, kAuthType, kPerson } from '@/common/constant/constant.js'
	
	export default {
		globalData: {
			token: "", // 登录token
			phone: "", // 登录手机号
			authType: "", // 下一步认证类型，0-已认证(无需认证)，1-已认证缺失身份证图片信息(姓名身份证不可改，需与上传图片对比)，2-未认证
			person: null, // 认证信息
		},
		onLaunch: function() {
			this.globalData.token = uni.getStorageSync(kToken)
			this.globalData.phone = uni.getStorageSync(kPhone)
			this.globalData.authType = uni.getStorageSync(kAuthType)
			this.globalData.person = uni.getStorageSync(kPerson)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/common/css/uni.css';
	@import '@/common/css/index.scss';

	uni-page-body,
	page {
		font-size: 30rpx;
		width: 100%;
		height: 100%;
	}
</style>
