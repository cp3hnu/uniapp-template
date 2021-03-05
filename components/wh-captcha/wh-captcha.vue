<template>
	<view @click="clickAction" :class="showClass">{{ showTitle }}</view>
</template>

<script>
	/*
	 * 获取验证码组件
	 * @param title 正常状态下显示文字
	 * @param waitTitle 等待状态下的显示文字，文字中需要包含SECORD字段以替换倒计时秒数
	 * @param secord 等待时长
	 * @param normalClass 正常状态下样式
	 * @param disabledClass 禁用状态下样式
	 */
	export default {
		props: {
			title: {
				type: String,
				default: '获取验证码'
			},
			waitTitle: {
				type: String,
				default: '稍等（SECORD）秒'
			},
			resendTitle: {
				type: String,
				default: '重新发送'
			},
			secord: {
				type: Number,
				default: 60
			},
			normalClass: {
				type: String,
				default: 'normal'
			},
			disabledClass: {
				type: String,
				default: 'disabled'
			}
		},
		data() {
			return {
				state: 'normal',
				currSecord: 0
			};
		},
		computed: {
			canSend() {
				return this.state !== 'wait';
			},
			showTitle() {
				if (this.state === 'normal') {
					return this.title
				} else if (this.state === 'wait') {
					return this.waitTitle.replace('SECORD', this.currSecord)
				} else {
					return this.resendTitle
				}
			},
			showClass() {
				return this.state === 'wait' ? this.disabledClass : this.normalClass
			}
		},
		methods: {
			clickAction() {
				if (this.canSend) {
					this.$emit('click');
				}
			},
			start() {
				if (this.intervalID) {
					clearInterval(this.intervalID)
				}
				this.currSecord = this.secord;
				this.state = 'wait';
				this.intervalID = setInterval(() => {
					this.countDown()
				}, 1000)
			},
			countDown() {
				this.currSecord = this.currSecord - 1;
				if (this.currSecord <= 0) {
					this.stop()
					this.$emit('timeOver');
				}
			},
			reset() {
				if (this.intervalID) {
					clearInterval(this.intervalID)
				}
				this.state = 'normal';
			},
			stop() {
				if (this.intervalID) {
					clearInterval(this.intervalID)
				}
				this.state = 'resend';
			}
		}
	};
</script>

<style lang="scss" scoped>
	.normal {
		background-color: $main-color;
		width: 160rpx;
		height: 65rpx;
		line-height: 65rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: white;
		text-align: center;
	}
	.disabled {
		background-color: #DCDCDC;
		width: 160rpx;
		height: 65rpx;
		line-height: 65rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: white;
		text-align: center;
	}
</style>
