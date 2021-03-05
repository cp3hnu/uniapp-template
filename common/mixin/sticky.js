const stickyMixin = {
	data() {
		return {
			alpha: 0,
			navBarHeight: 64
		}
	},
	computed: {
		navbarColor() {
			return `rgba(57, 83, 156, ${ this.alpha })`
		}
	},
	onLoad() {
		const info = uni.getSystemInfoSync()
		this.navBarHeight = info.statusBarHeight + 44
	},
	onPageScroll({ scrollTop }) {
		this.alpha = Math.min(1, scrollTop / this.navBarHeight)
	}
}

export default stickyMixin;