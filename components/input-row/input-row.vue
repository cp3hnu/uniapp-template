<template>
	<view>
		<view class="input-row-container">
			<view class="input-row-content">
				<slot name="icon">
					<image v-if="titleIcon" class="input-row-title-icon" :src="titleIcon"  mode="aspectFit"/>
				</slot>
				<view v-if="title" class="input-row-title" :style="{ width : titleWidth + 'rpx' }">
					<text v-if="required" style="color: #FF4545;"> * </text>
					<text>{{ title }}</text>
				</view>
				<view class="input-row-input">
					<textarea v-if="textarea && isTextareaVisible"
						:class="className" 
						:style="{ textAlign: inputAlign }"  
						:disabled="disabled" 
						:placeholder="placeholder" 
						:placeholder-style="placeholderStyle"
						:value="value"
						@input="onInput"
						@blur="blur"
						@focus="focus"
						:maxlength="maxlength"
						auto-height>
					</textarea>
					<view :class="className" v-else-if="textarea && !isTextareaVisible" :style="{ textAlign: inputAlign, flex: 1, lineHeight: '34rpx'}" >{{ value }}</view>
					<input v-else
						:class="className" 
						:style="{ textAlign: inputAlign }" 
						:type="type" 
						:disabled="disabled" 
						:placeholder="placeholder" 
						:placeholder-style="placeholderStyle"
						:value="value"
						@input="onInput"
						@blur="blur"
						@focus="focus">
					</input>
					<!-- #ifdef H5 -->
					<uni-icons v-if="showClear" style="margin: 0 16rpx;" type="clear" color="#8f8f94" size="16" @click="clear" />
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<uni-icons v-if="showClear" style="margin: 0 16rpx;" type="clear" color="#8f8f94" size="16" @touchstart="clear" />
					<!-- #endif -->
				</view>
			</view>
			<slot name="right">
				<cmd-icon v-if="arrow" class="arrow" type="chevron-right" size="48" color="#C5CAD5"></cmd-icon>
			</slot>
		</view>
		<view v-if="separator" class="input-row-line"></view>
	</view>
	
</template>

<script>
	import cmdIcon from '@/components/cmd-icon/cmd-icon.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	
	export default {
		name: "InputRow",
		components: { cmdIcon, uniIcons },
		data() {
			return {
				focused: false,
				textValue: ''
			}
		},
		props: {
			required: {
				type: Boolean,
				default: false
			},
			value: {
				type: [String, Number],
				default: ""
			},
			title: {
				type: String,
				default: ""
			},
			titleWidth: {
				type: [String, Number],
				default: "200"
			},
			type: {
				type: String,
				default: "text"
			},
			titleIcon: {
				type: String,
				default: ""
			},
			disabled: {
				type: Boolean,
				default: false
			},
			placeholderStyle: {
				type: String,
				default: ""
			},
			placeholder: {
				type: String,
				default: ""
			},
			arrow: {
				type: Boolean,
				default: false
			},
			inputAlign: {
				type: String,
				default: "left"
			},
			textarea: {
				type: Boolean,
				default: false
			},
			isTextareaVisible: {
				type: Boolean,
				default: true
			},
			clearable: {
				type: Boolean,
				default: true
			},
			maxlength: {
				type: Number,
				default: -1
			},
			separator: {
				type: Boolean,
				default: true
			},
			trim: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			className() {
				return this.disabled ? 'input-disabled-class' : 'input-normal-class'
			},
			showClear() {
				const show = this.value != null && this.value != '' && this.focused && !this.disabled && this.clearable
				return this.textarea ? show && this.isTextareaVisible : show
			},
			display() {
				return this.isTextareaVisible ? 'block' : 'none'
			},
			computedValue: {
				get() {
					return this.value
				},
				set(val) {
					this.$emit('input', val)
					
					if (this.trim) {
						this.$nextTick(() => {
							this.$emit('input', val.trim())
						})
					}
				}
			}
		},
		methods: {
			onInput(event) {
				const value = event.target.value
				this.$emit('input', value)
				if (this.trim) {
					this.$nextTick(() => {
						this.$emit('input', value.trim())
					})
				}
			},
			blur(event) {
				setTimeout(() => {
					this.focused = false;
				}, 100)
				this.$emit('blur')
			},
			clear() {
				this.$emit('input', '')
				// #ifdef H5
				this.$el.querySelector('input').focus()
				setTimeout(() => {
					this.focused = true;
				}, 200)
				// #endif
			},
			focus(event) {
				this.focused = true;
				this.$emit('focus', event)
			}
		}
	}
</script>

<style lang="scss">
	.input-row-container {
		padding: 26rpx 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		box-sizing: border-box;
		min-height: 100rpx;
	}
	.input-row-content {
		display: flex;
		align-items: center;
		flex: 1;
		flex-direction: row;
	}
	.input-row-title {
		font-size: 28rpx;
		font-weight: Medium;
		color: #101010;
	}
	.input-row-title-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 20rpx;
	}
	.input-row-input {
		color: #010101;
		font-size: 28rpx;
		font-weight: Medium;
		flex: 1;
		display: flex;
		align-items: center;
	}
	.input-row-input input {
		flex: 1;
		z-index: 0;
	}
	.input-row-input textarea {
		flex: 1;
		width: 100%;
		z-index: 0;
	}
	.input-normal-class {
		color: #000000;
		font-size: 28rpx;
		box-sizing: border-box;
	}
	/* #ifndef MP-WEIXIN */
	.input-disabled-class {
		color: #555555;
		font-size: 28rpx;
		box-sizing: border-box;
	}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.input-disabled-class {
		color: #999999;
		font-size: 28rpx;
		box-sizing: border-box;
	}
	/* #endif */
	.input-row-line {
		height: 2rpx;
		background-color: #EEEEEE;
	}
</style>

