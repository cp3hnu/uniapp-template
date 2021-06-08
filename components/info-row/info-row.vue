<template>
	<view class="info-row__container" :style="{ alignItems: flexAlign }" @click="click">
		<text :style="{ fontSize: titleSize + 'rpx', color: titleColor, width: titleWidth + 'rpx' }" class="info-row__title">{{ title }}</text>
		<slot name="detail">
			<text :style="{ fontSize: detailSize + 'rpx', color: detailColor, textAlign: detailAlign }" class="info-row__detail">{{ detail }}</text>
		</slot>
		<cmd-icon v-if="arrow" class="info-row__arrow" type="chevron-right" size="40" color="#C5CAD5"></cmd-icon>
	</view>
</template>

<script>
	import cmdIcon from '@/components/cmd-icon/cmd-icon.vue'
	export default {
		name: "InfoRow",
		components: { cmdIcon },
		data() {
			return {
			};
		},
		props: {
			arrow: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ""
			},
			detail: {
				type: String,
				default: ""
			},
			titleColor: {
				type: String,
			},
			detailColor: {
				type: String,
			},
			titleSize: {
				type: [String, Number],
			},
			detailSize: {
				type: [String, Number],
			},
			titleWidth: {
				type: [String, Number],
			},
			detailAlign: {
				type: String,
				default: "right"
			},
			flexAlign: {
				type: String,
				default: "center"
			}
		},
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.info-row__container {
		display: flex;
		font-size: 28rpx;
		color: #000000;
	}
	.info-row__arrow {
		margin-left: auto;
		margin-right: -12rpx;
	}
	.info-row__title {
		 flex: 0 0 auto;
		 margin-right: 20rpx;
	}
	.info-row__detail {
		flex: 1;
		word-break: break-all;
	}
</style>
