<template>
	<dialog-view 
		:visible.sync="visible" 
		:title="dialog.title" 
		:content="dialog.content"
		:cancelText="dialog.cancelText" 
		:confirmText="dialog.confirmText" 
		:cancelColor="dialog.cancelColor" 
		:confirmColor="dialog.confirmColor"
		:showCancel="dialog.showCancel" 
		:showClose="false"
		@confirm="confirmAction" 
		@cancel="cancelAction" 
	/>
</template>

<script>
	import dialogView from "@/components/dialog-view/dialog-view.vue"
	import { kMainColor } from "@/constant/constant.js"
	export default {
		components: { dialogView },
		data() {
			return {
				visible: false,
				dialog: {
					title: "",
					content: "",
					showCancel: true,
					showClose: false,
					cancelText: "取消",
					confirmText: "确定",
					cancelColor: "#848484",
					confirmColor: kMainColor
				}
			};
		},
		methods: {
			showModal(data) {
				const { confirm, cancel, ...others } = data
				this.dialog = Object.assign(this.dialog, others)
				this.visible = true
				this.confirmCallBack = confirm
				this.cancelCallBack = cancel
			},
			confirmAction() {
				this.confirmCallBack()
			},
			cancelAction() {
				this.cancelCallBack()
			}
		}
	}
</script>

<style lang="scss">

</style>
