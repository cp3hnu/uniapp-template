// 过滤器
export { fmoney, fmoneyYuan, fmoneySymbol, fmoneyTenThousandYuan } from '@/utils/formatter.js'
import { statusName } from '@/utils/status.js'
export { maskedPhone } from '@/utils/util.js'

export function fStatus(value, type) {
	return statusName(type, value)
}