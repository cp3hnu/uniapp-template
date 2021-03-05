<template>
	<view class="u-upload">
		<view class="u-list-item u-add-view" v-for="item in uploadLists" :key="item.uid" :style="{ width: $addUnit(width), height: $addUnit(height) }">
			<image class="u-preview-image" :src="item.url || item.path" @tap.stop="previewImage(item.url || item.path)"
			 :mode="imageMode"></image>
			<u-circle-progress v-if="showProgress && item.progress > 0 && item.status === 'ready'" class="u-progress"
			 :percent="item.progress" :width="200" bgColor="rgb(0,0,0,0.5)"></u-circle-progress>
			<image v-if="deletable" class="u-delete-icon" src="/static/images/close.png" @tap.stop="deleteFile(item)"></image>
		</view>
		<view class="u-add-view" @tap="selectFile" v-if="maxCount > uploadLists.length" :style="{ width: $addUnit(width), height: $addUnit(height) }">
			<slot name="default">
				<view class="u-add-wrap" hover-class="u-add-wrap__hover" hover-stay-time="150">
					<uni-icons type="plusempty" class="u-add-btn" size="60" color="#878787"></uni-icons>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
	/**
	 * upload 图片上传
	 * @description 该组件用于上传图片场景
	 * @property {String} action 服务器上传地址
	 * @property {Number} width 图片单元格宽度，单位rpx（默认200）
	 * @property {Number} height 图片单元格高度，单位rpx（默认200）
	 * @property {String Number} max-count 最大选择图片的数量（默认99）
	 * @property {Boolean} show-progress 是否显示进度条（默认true）
	 * @property {String} image-mode 预览图片等显示模式，可选值为uni的image的mode属性值（默认aspectFill）
	 * @property {String | Number} index 在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件
	 * @property {Object} header 上传携带的头信息，对象形式
	 * @property {Object} form-data 上传额外携带的参数
	 * @property {String} name 上传文件的字段名，供后端获取使用（默认file）
	 * @property {Array<String>} size-type original 原图，compressed 压缩图，默认二者都有（默认['original', 'compressed']）
	 * @property {Array<String>} source-type 选择图片的来源，album-从相册选图，camera-使用相机，默认二者都有（默认['album', 'camera']）
	 * @property {Boolean} preview-full-image	是否可以通过uni.previewImage预览已选择的图片（默认true）
	 * @property {Boolean} multiple	是否开启图片多选，部分安卓机型不支持（默认true）
	 * @property {Boolean} deletable 是否显示删除图片的按钮（默认true）
	 * @property {String Number} max-size 选择单个文件的最大大小，单位MB，默认不限制（10MB）
	 * @property {Array<Object>} file-list 默认显示的图片列表，数组元素为对象，必须提供url属性
	 * @property {Boolean} auto-upload 选择完图片是否自动上传，见上方说明（默认true）
	 * @property {Boolean} show-tips 特殊情况下是否自动提示toast，见上方说明（默认true）
	 * @property {Boolean} limitType 上传图片的限制类型（默认['png', 'jpg', 'jpeg', 'webp', 'gif', 'image']）
	 * @property {Fuction} beforeUpload 上传文件之前的钩子，参数为上传的文件，若返回 false，则停止上传（默认true） 
	 * @event {Function} on-oversize 图片大小超出最大允许大小
	 * @event {Function} on-preview 全屏预览图片时触发
	 * @event {Function} on-remove 移除图片时触发
	 * @event {Function} on-success 图片上传成功时触发
	 * @event {Function} on-error 图片上传失败时触发
	 * @event {Function} on-progress 图片上传过程中的进度变化过程触发
	 * @example <u-upload :action="action" :file-list="fileList" ></u-upload>
	 */
	
	import { uploadFileCallBack } from '@/common/api/request.js'
	
	export default {
		name: 'u-upload',
		props: {
			// 后端地址
			action: {
				type: String,
				required: true
			},
			// 最大上传数量
			maxCount: {
				type: [String, Number],
				default: 9
			},
			//  是否显示进度条
			showProgress: {
				type: Boolean,
				default: true
			},
			// 预览上传的图片时的裁剪模式，和image组件mode属性一致
			imageMode: {
				type: String,
				default: 'aspectFill'
			},
			// 头部信息
			header: {
				type: Object,
				default () {
					return {};
				}
			},
			// 额外携带的参数
			formData: {
				type: Object,
				default () {
					return {};
				}
			},
			// 上传的文件字段名
			name: {
				type: String,
				default: 'file'
			},
			// 所选的图片的尺寸, 可选值为original compressed
			sizeType: {
				type: Array,
				default () {
					return ['original', 'compressed'];
				}
			},
			sourceType: {
				type: Array,
				default () {
					return ['album', 'camera'];
				}
			},
			// 是否在点击预览图后展示全屏图片预览
			previewFullImage: {
				type: Boolean,
				default: true
			},
			// 是否开启图片多选，部分安卓机型不支持
			multiple: {
				type: Boolean,
				default: true
			},
			// 是否展示删除按钮
			deletable: {
				type: Boolean,
				default: true
			},
			// 文件大小限制，单位为MB
			maxSize: {
				type: Number,
				default: 10
			},
			// 显示已上传的文件列表
			fileList: {
				type: Array,
				default () {
					return [];
				}
			},
			// 是否自动上传
			autoUpload: {
				type: Boolean,
				default: true
			},
			// 是否显示toast消息提示
			showTips: {
				type: Boolean,
				default: true
			},
			// 内部预览图片区域和选择图片按钮的区域宽度
			width: {
				type: [String, Number],
				default: 200
			},
			// 内部预览图片区域和选择图片按钮的区域高度
			height: {
				type: [String, Number],
				default: 200
			},
			// 上传前的钩子，每个文件上传前都会执行
			beforeUpload: {
				type: Function,
				default: null
			},
			// 允许上传的图片后缀
			limitType: {
				type: Array,
				default () {
					// 支付宝小程序真机选择图片的后缀为"image"
					// https://opendocs.alipay.com/mini/api/media-image
					return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'];
				}
			},
			// 在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件
			index: {
				type: [Number, String],
				default: ''
			}
		},
		mounted() {},
		data() {
			return {
				uploadLists: [],
				tasks: {},
				tempIndex: 1
			};
		},
		watch: {
			fileList: {
				immediate: true,
				handler(fileList) {
					this.uploadLists = fileList.map(item => {
						item.uid = item.uid || (Date.now() + this.tempIndex++)
						item.status = item.status || 'success'
						return item
					});
				}
			}
		},
		methods: {
			// 清除列表
			clear() {
				this.uploadLists = [];
			},
			// 选择图片
			selectFile() {
				const { name = '', maxCount, multiple, maxSize, sizeType, uploadLists, camera, compressed, maxDuration, sourceType } =
				this;
				const newMaxCount = maxCount - uploadLists.length;
				if (newMaxCount <= 0) {
					this.handleExceed()
					return
				}

				// 设置为只选择图片的时候使用 chooseImage 来实现
				const chooseFile = new Promise((resolve, reject) => {
					uni.chooseImage({
						count: multiple ? newMaxCount : 1,
						sourceType: sourceType,
						sizeType: sizeType,
						success: resolve,
						fail: reject
					});
				});
				chooseFile
					.then(res => {
						res.tempFiles.forEach((rawFile, index) => {
							// 检查文件后缀是否允许，如果不在this.limitType内，就会返回false
							if (!this.checkFileExt(rawFile)) return;

							// 如果是非多选，index大于等于1或者超出最大限制数量时，不处理
							if (!multiple && index >= 1) return;

							if (rawFile.size > maxSize * 1024 * 1024) {
								this.handleOversize(rawFile)
							} else {
								let canUpload = true
								if (this.beforeUpload) {
									canUpload = this.beforeUpload(rawFile)
								}
								if (canUpload) {
									rawFile.uid = Date.now() + this.tempIndex++;
									const file = {
										status: 'ready',
										progress: 0,
										uid: rawFile.uid,
										raw: rawFile,
										path: rawFile.path
									}
									this.uploadLists.push(file);
									if (this.autoUpload) {
										this.uploadFile(file)
									}
								}
							}
						});
					})
					.catch(error => {
						console.log("choose error", error)
					});
			},
			// 提示用户消息
			showToast(message, force = false) {
				if (this.showTips || force) {
					uni.showToast({
						title: message,
						icon: "none",
						mask: false,
						duration: 3000
					});
				}
			},
			// 上传图片
			uploadFile(file) {
				const task = uploadFileCallBack({
					url: this.action,
					filePath: file.path,
					name: this.name,
					formData: this.formData,
					header: this.header,
					success: (data) => {
						this.handleSuccess(file, data)
					},
					fail: (error) => {
						this.handleError(file, error)
					},
					progress: (progress) => {
						this.handleProgress(file, progress)
					}
				})
				this.tasks[file.uid] = task
			},
			getIndexOf(file) {
				for (let i = 0; i< this.uploadLists.length; i++) {
					if (file.uid === this.uploadLists[i].uid) {
						return i
					}
				}
				return -1
			},
			getFileInList(file) {
				const idx = this.getIndexOf(file)
				if (idx !== -1) {
					return this.uploadLists[idx]
				}
				return file
			},
			handleExceed() {
				this.$emit('on-exceed', this.uploadLists, this.index);
				this.showToast(`只能上传 ${ maxCount } 张图片`)
			},
			// 超出大小
			handleOversize(rawFile) {
				this.$emit('on-oversize', rawFile, this.uploadLists, this.index);
				this.showToast(`图片不能超过 ${ maxSize } MB`);
			},
			// 上传进度
			handleProgress(file, progress) {
				const listFile = this.getFileInList(file)
				console.log("handleProgress", progress)
				if (progress > 0) {
					listFile.progress = progress;
					this.$emit('on-progress', progress, listFile, this.uploadLists, this.index);
				}
			},
			// 上传成功
			handleSuccess(file, response) {
				const listFile = this.getFileInList(file)
				this.tasks[file.uid] = null
				listFile.response = response;
				listFile.progress = 100;
				listFile.status = "success";
				this.$emit('on-success', response, listFile, this.uploadLists, this.index);
			},
			// 上传失败
			handleError(file, error) {
				const listFile = this.getFileInList(file)
				
				this.showToast(error.errMsg);
				this.uploadLists.splice(this.getIndexOf(file), 1)
				this.$emit('on-error', error, listFile, this.uploadLists, this.index);
			},
			// 删除图片
			handleRemove(file) {
				const task = this.tasks[file.uid]
				if (task) {
					task.abort()
				}
				this.uploadLists.splice(this.getIndexOf(file), 1);
				this.$emit('on-remove', file, this.uploadLists, this.index);
			},
			// 删除图片
			deleteFile(file) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除此项吗？',
					success: (res) => {
						if (res.confirm) {
							this.handleRemove(file);
						}
					}
				});
			},
			// 预览图片
			previewImage(url) {
				if (!this.previewFullImage) return;
				const images = this.uploadLists.map(item => item.url || item.path);
				uni.previewImage({
					urls: images,
					current: url,
					success: () => {
						this.$emit('on-preview', url, this.uploadLists, this.index);
					},
					fail: () => {
						this.showToast('预览图片失败')
					}
				});
			},
			// 判断文件后缀是否允许
			checkFileExt(file) {
				// 检查是否在允许的后缀中
				let noArrowExt = false;
				// 获取后缀名
				let fileExt = '';
				const reg = /.+\./;
				// 如果是H5，需要从name中判断
				// #ifdef H5
				fileExt = file.name.replace(reg, "").toLowerCase();
				// #endif
				// 非H5，需要从path中读取后缀
				// #ifndef H5
				fileExt = file.path.replace(reg, "").toLowerCase();
				// #endif
				// 使用数组的some方法，只要符合limitType中的一个，就返回true
				noArrowExt = this.limitType.some(ext => {
					// 转为小写
					return ext.toLowerCase() === fileExt;
				})
				if (!noArrowExt) this.showToast(`不允许选择${fileExt}格式的文件`);
				return noArrowExt;
			}
		}
	};
</script>

<style lang="scss">
	.u-upload {
		display: flex;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
		padding-left: 30rpx;
		padding-bottom: 26rpx;
	}

	.u-add-view {
		margin-top: 26rpx;
		margin-right: 40rpx;
	}

	.u-list-item {
		overflow: visible;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.u-delete-icon {
		position: absolute;
		top: -15rpx;
		right: -15rpx;
		z-index: 20;
		width: 30rpx;
		height: 30rpx;
	}

	.u-preview-image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.u-add-wrap {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgb(244, 245, 246);
		// border: 2rpx dotted rgb(235, 236, 238);
	}

	.u-add-wrap__hover {
		background-color: rgb(235, 236, 238);
	}

	.u-progress {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 10;
	}
</style>
