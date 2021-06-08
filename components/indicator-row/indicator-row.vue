<template>
	<view class="indicator-row__container" @click="click">
		<view class="indicator-row__content">
			<slot name="icon">
				<image v-if="icon" class="indicator-row__icon" :src="icon"  mode="aspectFit"/>
			</slot>
			<slot name="title">
				<view class="indicator-row__title" :style="{ width : titleWidth + 'rpx' }">{{ title }}</view>
			</slot>
			<view class="indicator-row__value" :style="{ justifyContent: justifyContent }">
				<slot name="default">
					<view>{{ value }}</view>
				</slot>
				<slot name="default">
					<view v-if="placeholder !== '' && value === ''" class="indicator-row__placeholder">{{ placeholder }}</view>
				</slot>
			</view>
			<cmd-icon v-if="arrow" class="indicator-row__arrow" type="chevron-right" size="40" color="#C5CAD5"></cmd-icon>
		</view>
		<view v-if="separator" class="indicator-row__separator"></view>
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
			icon: {
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
				default: "right" // left | right
			},
			placeholder: {
				type: String,
				default: ""
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
	.indicator-row__container {
		background-color: white;
	}
	.indicator-row__content {
		display: flex;
		box-sizing: border-box;
		padding: 26rpx 30rpx;
		align-items: center;
		min-height: 100rpx;
	}
	.indicator-row__icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 20rpx;
	}
	.indicator-row__title {
		font-size: 28rpx;
		font-weight: Medium;
		color: #101010;
	}
	.indicator-row__value {
		flex: 1;
		font-size: 28rpx;
		color: #333;
		margin-right: 12rpx;
		display: flex;
	}
	.indicator-row__arrow {
		margin-left: auto;
		margin-right: -12rpx;
	}
	.indicator-row__separator {
		height: 2rpx;
		background-color: #eee;
	}
	.indicator-row__placeholder {
		flex: 1;
		font-size: 28rpx;
		color: #999;
		margin-right: 12rpx;
		display: flex;
	}
</style>
