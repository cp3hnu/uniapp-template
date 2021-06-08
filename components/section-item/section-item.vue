<template>
	<view class="section-item__container" :style="{ marginLeft: $addUnit(left), marginTop: $addUnit(top) }">
		<view class="section-item__block"></view>
		<view class="section-item__title">{{ title }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			top: {
				type: Number,
				default: 0
			},
			left: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.section-item__container {
		display: flex;
		align-items: center;
	}
	.section-item__block {
		width: 4rpx;
		height: 28rpx;
		background-color: #3452A6;
	}
	.section-item__title {
		font-size: 30rpx;
		color: #5A5A5A;
		margin-left: 16rpx;
	}
</style>
