<template>
	<uni-popup ref="popup" type="center" :maskClick="false">
		<view class="dialog-view__container">
			<view v-if="showClose" class="dialog-view__close" @click="closeAction">
				<cmd-icon type="close" size="24" color="#BFBFBF"></cmd-icon>
			</view>
			<view class="dialog-view__content-container">
				<view class="dialog-view__title" :style="{ color: titleColor }">{{ title }}</view>
				<view class="dialog-view__separator"></view>
				<view class="dialog-view__content">
					<slot name="content">
						<text :style="{color: contentColor}">{{ content }}</text>
					</slot>
				</view>
			</view>
			<slot name="button">
				<view class="dialog-view__button-container">
					<button v-if="showCancel" class="dialog-view__button dialog-view__cancel-button" :style="{ color: cancelColor, backgroundColor: cancelBackgroundColor }"
					 @click="cancelAction">
						{{ cancelText }}
					</button>
					<button class="dialog-view__button dialog-view__confirm-button" :style="{ color: confirmColor, backgroundColor: confirmBackgroundColor }"
					 @click="confirmAction" :disabled="confirmDisabled">
						{{ confirmText }}
					</button>
				</view>
			</slot>
		</view>
	</uni-popup>
</template>

<script>
	import cmdIcon from '@/components/cmd-icon/cmd-icon.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import { kCancelTextColor, kMainTextColor } from "@/constant/constant"
	
	export default {
		name: "DialogView",
		components: { uniPopup, cmdIcon },
		data() {
			return {
			};
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ""
			},
			titleColor: {
				type: String,
				default: "#000000"
			},
			content: {
				type: String,
				default: ""
			},
			contentColor: {
				type: String,
				default: "#000000"
			},
			showCancel: {
				type: Boolean,
				default: true
			},
			cancelText: {
				type: String,
				default: "取消"
			},
			confirmText: {
				type: String,
				default: "确定"
			},
			cancelColor: {
				type: String,
				default: kCancelTextColor
			},
			confirmColor: {
				type: String,
				default: kMainTextColor
			},
			cancelBackgroundColor: {
				type: String,
				default: "white"
			},
			confirmBackgroundColor: {
				type: String,
				default: "white"
			},
			confirmDisabled: {
				type: Boolean,
				default: false
			},
			showClose: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			visible(newValue, oldValue) {
				if (newValue) {
					this.$refs.popup.open()
				} else {
					this.$refs.popup.close()
				}
			}
		},
		methods: {
			closeAction() {
				this.$emit('update:visible', false) 
				this.$emit("close")
			},
			cancelAction() {
				this.$emit('update:visible', false)
				this.$emit("cancel")
			},
			confirmAction() {
				this.$emit('update:visible', false)
				this.$emit("confirm")
			}
		}
	}
</script>

<style lang="scss">
	.dialog-view__container {
		width: 588rpx;
		background-color: white;
		border-radius: 10rpx;
		padding-top: 30rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.dialog-view__content-container {
		padding: 0 40rpx;
	}

	.dialog-view__close {
		position: absolute;
		top: 0;
		right: 0;
		padding: 20rpx;
		z-index: 100;
		text-align: center;
	}

	.dialog-view__title {
		text-align: center;
		font-size: 34rpx;
		font-weight: bold;
	}
	
	.dialog-view__separator {
		margin: 30rpx -40rpx 0;
		background-color: #DFE1E2;
		height: 1px;
	}

	.dialog-view__content {
		margin-top: 30rpx;
		margin-bottom: 40rpx;
		text-align: center;
		font-size: 30rpx;
		color: #000000;
	}

	.dialog-view__button-container {
		display: flex;
		border-top: 2rpx solid #EEEEEE;

		.dialog-view__button {
			height: 88rpx;
			line-height: 88rpx;
			flex: 1;
			font-size: 32rpx;
			border: none;
			border-radius: 0;
			padding: 0;
			font-weight: bold;
		}
	}

	.dialog-view__button:nth-child(2) {
		border-left: 2rpx solid #EEEEEE;
	}
</style>
