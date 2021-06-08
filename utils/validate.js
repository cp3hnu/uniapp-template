// 数据格式验证

// 判断是整数或者小数，包括正负数
export const isNumber = (value) => {
	const reg = /^-?(([1-9]\d*)|0)(\.\d+)?$/
	return reg.test(value)
}

// 判断是整数或者小数，正数，小数最多两位小数，用于金额输入
export const isInputNumber = (value) => {
	const reg = /^(([1-9]\d*)|0)(\.\d{1,2})?$/
	return reg.test(value)
}

// 金额正则表达式，用于控制金额输入
export const amountPattern = /(([1-9]\d*)|0)(\.\d{0,2})?/