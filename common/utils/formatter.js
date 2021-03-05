// 数据格式化，数据转换
import { isNumber } from "./verification.js"

// 千位逗号分隔, 保留两位小数
export function fmoney(value, cent = false) {
	if (!isNumber(value)) {
		return ''
	}
	
	value = parseFloat(value)
	if (cent) {
		value = value / 100
	}
	
	// 判断是正负数
	let symbol = ''
	if (value < 0) {
		symbol = '-'
	}
	value = Math.abs(value)

	const n = 2
	value = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
	const l = value.split('.')[0].split('').reverse()
	const r = value.split('.')[1]
	let t = ''
	for (let i = 0; i < l.length; i++) {
		t += l[i] + (((i + 1) % 3 === 0 && (i + 1) !== l.length) ? ',' : '')
	}
	return symbol + t.split('').reverse().join('') + '.' + r
}

// 金额 + '元'
export function fmoneyYuan(value, cent = false) {
	if (!isNumber(value)) {
		return ''
	}
	return fmoney(value, cent) + ' 元'
}

// '￥' + 金额
export function fmoneySymbol(value, cent = false) {
	if (!isNumber(value)) {
		return ''
	}
	
	// 判断是正负数
	let symbol = ''
	if (value < 0) {
		symbol = '-'
	}
	value = Math.abs(value)
	
	return symbol + '￥' + fmoney(value, cent)
}

// 分转万元, 千位逗号分隔，保留两位小数, 金额 + '万'
export function fmoneyTenThousandYuan(value) {
	if (!isNumber(value)) {
		return ''
	}
	value = parseFloat(value) / 1000000
	return fmoney(value, false) + '万'
}