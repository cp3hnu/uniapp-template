<template>
	<view class="form-item__container" :style="{ alignItems: flexAlign, flexDirection: flexDirection }">
		<view class="form-item__title_container">
			<view v-if="required" class="form-item__star-mark">*</view>
			<slot name="title">
				<view class="form-item__title" :style="{ width: innerTitleWidth }">{{ title }}</view>
			</slot>
		</view>
		<view class="form-item__component">
			<slot></slot>
		</view>
		<view v-if="separator" class="form-item__separator"></view>
	</view>
</template>

<script>
	/**
	 * @description 表单item
	 * @property {Boolean} required 是否带*符号（默认false）
	 * @property {String} title 标题（默认空字符串）
	 * @property {String | Number} titleWidth 标题宽度，单位rpx（默认100）
	 * @property {Boolean} separator 是否有分割线（默认true）
	 * @property {String} flexAlign 横向flex布局对齐方式，对应align-items属性（默认center）
	 * @property {Boolean} column 是否竖向排列（默认false）
	 * @example 
	 * <form-item title="快递单号" :title-width="titleWidth" required>
				<template>
					<input></input>
				</template>
			</form-item>
		</template>
	 */
	export default {
		name: "form-item",
		props: {
			// 是否带*
			required: {
				type: Boolean,
				default: false
			},
			// 标题
			title: {
				type: String,
				default: '' 
			},
			// 标题宽度
			titleWidth: {
				type: [Number, String],
				default: 100
			},
			// 是否有分割线
			separator: {
				type: Boolean,
				default: true
			},
			// row 对齐方式, start, center, end
			flexAlign: {
				type: String,
				default: "center"
			},
			// 是否竖向排列
			column: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			flexDirection() {
				return this.column ? 'column' : 'row'
			},
			innerTitleWidth() {
				return this.column ? '100%' : this.titleWidth + 'rpx'
			}
		}
	}
</script>

<style lang="scss">
	.form-item__container {
		display: flex;
		padding: 30rpx;
		position: relative;
	}
	.form-item__title_container {
		display: flex;
		align-items: center;
	}
	.form-item__star-mark {
		font-size: 24rpx;
		color: #FF4545;
		margin-right: 10rpx;
	}
	.form-item__title {
		font-size: 24rpx;
		color: #333;
	}
	.form-item__component {
		flex: 1;
	}
	.form-item__separator {
		position: absolute;
		bottom: 0;
		height: 1px;
		left: 30rpx;
		width: 720rpx;
		background-color: #E5E5E5;
	}
</style>
