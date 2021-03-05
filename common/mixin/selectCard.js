import { myBankCardListReq } from '@/common/api/api.js'
import { kBindCardEvent } from '@/common/constant/constant.js'

const selectCardMixin = {
	data() {
		return {
			isSelectingCard: false,
			bankCards: [],
			isBankCardReqSuccess: false
		}
	},
	onLoad() {
		this.getBankCards()
		uni.$on(kBindCardEvent, (res) => {
			this.getBankCards(false)
		})
	},
	onUnload() {
		uni.$off(kBindCardEvent)
	},
	methods: {
		selectBankCard() {
			if (this.isBankCardReqSuccess) {
				this.isSelectingCard = true
			} else {
				this.getBankCards(false)
			}
		},
		getBankCards(silent = true) {
			if (!silent) {
				this.$showLoading()
			}
			const person = getApp().globalData.person || {}
			const empNo = person.empNo || ""
			myBankCardListReq({
				empNo: empNo
			}).then((data) => {
				this.isBankCardReqSuccess = true
				this.bankCards = data
				if (!silent) {
					this.$hideLoading()
					this.isSelectingCard = true
				}
			}).catch((error) => {
				this.isBankCardReqSuccess = false
				if (!silent) {
					this.$hideLoading()
					this.$showToast(error.errMsg)
				}
			})
		}
	}
}

export default selectCardMixin;