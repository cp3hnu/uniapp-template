// 数据格式验证

// 判断是整数或者小数
export const isNumber = (value) => {
	const reg = /^-?(([1-9]{1}\d*)|(0{1}))(\.\d+)?$/;
	return reg.test(value);
}

// 判断是整数或者小数，小数最多两位小数，且是正数，用于金额输入
export const isInputNumber = (value) => {
	const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
	return reg.test(value);
}