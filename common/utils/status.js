// 各种状态值
export const dict = {
	registerStatus: [
		{ value: 0, name: '未开始' },
		{ value: 1, name: '申请中' },
		{ value: 2, name: '已完成' }
	],
}

export function statusArray(type) {
	return dict[type]
}

export function statusName(type, value) {
	const array = dict[type]
	for (const item of array) {
		if (item.value == value) {
			return item.name
		}
	}
	return '未知'
}
