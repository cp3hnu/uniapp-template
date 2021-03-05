<template>
	<uni-popup ref="popup" type="bottom" :maskClick="false">
		<view class="content-container">
			<view class="nav-bar">
				<uni-icons class="back-icon" color="#949494" type="closeempty" size="30" @click="close"/>
				<view>选择银行卡</view>
			</view>
			<view v-for="item in cards" :key="item.id" class="bank-card-row" @click="selectCard(item)">
				<image class="bank-logo-image" :src="item.logUrl" mode="aspectFit"></image>
				<view class="bank-card-content">
					<view>{{ item.bankName }}（{{ item.accNo }}）</view>
					<image v-if="selectedCard.id === item.id" class="select-image" src="/static/images/bank-card-select.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="add-view" @click="gotoBindCard">
				<image class="add-image" src="/static/images/bank-card-add.png" mode="aspectFit"></image>
				<view>使用新银行卡</view>
				<image class="forward-icon" src="/static/images/arrow-right.png" mode="aspectFit"></image>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			cards: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				selectedCard: null
			};
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
			close() {
				this.$emit('update:visible', false)
				this.$emit("close")
			},
			gotoBindCard() {
				this.$emit('update:visible', false)
				uni.navigateTo({
					url: "/pages/mine/addBankCard"
				})
			},
			selectCard(card) {
				this.$emit('update:visible', false)
				this.selectedCard = card
				this.$emit('change', card)
			}
		}
	}
</script>

<style lang="scss">
	.content-container {
		background-color: white;
		padding-bottom: 72rpx;
	}
	.nav-bar {
		position: relative;
		border-bottom: 2rpx solid #F9F9F9;
		font-size: 32rpx;
		color: #090909;
		font-weight: 500;
		text-align: center;
		height: 82rpx;
		line-height: 82rpx;
	}
	
	.back-icon {
		position: absolute;
		left: 20rpx;
	}
	
	.bank-card-row {
		height: 84rpx;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
	}
	
	.bank-logo-image {
		width: 42rpx;
		height: 42rpx;
		margin-right: 32rpx;
	}
	
	.bank-card-content {
		height: 84rpx;
		border-bottom: 2rpx solid #F9F9F9;
		padding-right: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		color: #090909;
		font-weight: 500;
		flex: 1;
	}
	
	.select-image {
		width: 28rpx;
		height: 22rpx;
	}
	
	.add-view {
		height: 84rpx;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: #969696;
		font-weight: 500;
		border-bottom: 2rpx solid #F9F9F9;
		padding: 0 30rpx;
	}
	
	.add-image {
		width: 37rpx;
		height: 37rpx;
		margin-right: 37rpx;
	}
	
	.forward-icon {
		margin-left: auto;
		margin-right: 0;
		width: 14rpx;
		height: 24rpx;
	}
	
</style>
