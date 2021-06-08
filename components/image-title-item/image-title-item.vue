<template>
	<view class="image-title-item__container" @click="click">
		<image class="image-title-item__icon" :src="src" mode="aspectFit"></image>
		<text class="image-title-item__title">{{ title }}</text>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				// 图片地址
				type: String,
				default: ''
			},
			title: {
				// 名称
				type: String,
				default: ''
			}
		},
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style style="scss">
	.image-title-item__container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.image-title-item__icon {
		width: 55rpx;
		height: 55rpx;
		margin-bottom: 26rpx;
	}
	
	.image-title-item__title {
		font-size: 24rpx;
		color: #090909;
	}
</style>
