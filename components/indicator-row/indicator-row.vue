<template>
	<view class="indicator-row-container" @click="click">
		<view class="indicator-row-content">
			<slot name="icon">
				<image v-if="titleIcon" class="indicator-row-title-icon" :src="titleIcon"  mode="aspectFit"/>
			</slot>
			<slot name="title">
				<view class="indicator-row-title" :style="{ width : titleWidth + 'rpx' }">{{ title }}</view>
			</slot>
			<view class="indicator-row-value" :style="{ justifyContent: justifyContent }">
				<slot name="default">
					<view>{{ value }}</view>
				</slot>
			</view>
			<cmd-icon v-if="arrow" class="indicator-row-arrow" type="chevron-right" size="40" color="#C5CAD5"></cmd-icon>
		</view>
		<view v-if="separator" class="indicator-row-line"></view>
	</view>
</template>

<script>
	import cmdIcon from '@/components/cmd-icon/cmd-icon.vue'
	
	export default {
		data() {
			return {
				
			};
		},
		components: { cmdIcon },
		props: {
			title: {
				type: String,
				default: ""
			},
			titleIcon: {
				type: String,
				default: ""
			},
			titleWidth: {
				type: [String, Number],
				default: "200"
			},
			value: {
				type: String,
				default: ""
			},
			valueAlign: {
				type: String,
				default: "right"
			},
			arrow: {
				type: Boolean,
				default: true
			},
			separator: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			justifyContent() {
				return this.valueAlign === "right" ? "flex-end" : "flex-start" 
			}
		},
		methods: {
			click() {
				this.$emit("click")
			}
		}
	}
</script>

<style lang="scss">
	.indicator-row-container {
		background-color: white;
	}
	.indicator-row-content {
		display: flex;
		box-sizing: border-box;
		padding: 26rpx 30rpx;
		align-items: center;
		min-height: 100rpx;
	}
	.indicator-row-title-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 20rpx;
	}
	.indicator-row-title {
		font-size: 28rpx;
		font-weight: Medium;
		color: #101010;
	}
	.indicator-row-value {
		flex: 1;
		font-size: 28rpx;
		color: #333333;
		margin-right: 12rpx;
		display: flex;
	}
	.indicator-row-arrow {
		margin-left: auto;
		margin-right: -12rpx;
	}
	.indicator-row-line {
		height: 2rpx;
		background-color: #EEEEEE;
	}
</style>
