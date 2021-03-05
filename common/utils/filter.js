// 过滤器
export { fmoney, fmoneyYuan, fmoneySymbol, fmoneyTenThousandYuan } from '@/common/utils/formatter.js'
import { statusName } from '@/common/utils/status.js'
export { maskedPhone } from '@/common/utils/util.js'

export function fStatus(value, type) {
	return statusName(type, value)
}