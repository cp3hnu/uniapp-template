const loadMoreMixin = {
	data() {
		return {
			records: [],
			total: 0,
			pageNo: 1,
			pageSize: 20,
			moreStatus: 'more',
			contentText: {
				contentdown: "上拉加载更多",
				contentrefresh: "正在加载...",
				contentnomore: "没有更多数据了"
			}
		}
	},
	computed: {
		hasData() {
			return this.records.length > 0
		},
		hasMoreData() {
			return this.records.length < this.total
		}
	},
	methods: {
		reset() {
			this.prepareToRefresh()
			this.records = []
		},
		prepareToRefresh() {
			this.pageNo = 1
			this.moreStatus = 'more'
		},
		prepareToLoadMore() {
			this.pageNo += 1
			this.moreStatus = 'loading'
		},
		changeMoreStatus() {
			if (this.records.length < this.total) {
				this.moreStatus = 'more'
			} else {
				this.moreStatus = 'nomore'
			}
		},
		resetStatus() {
			this.moreStatus = 'more'
		}
	}
}

export default loadMoreMixin;
