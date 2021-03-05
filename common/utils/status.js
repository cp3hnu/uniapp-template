// 各种状态值
export const dict = {
	// 项目类型
	projectType: [
		{ value: 0, name: '房建' },
		{ value: 1, name: '公建' },
		{ value: 2, name: '路桥' }
	],
	projectStatus: [
		{ value: 1, name: '审核中' },
		{ value: 2, name: '审核未通过' },
		{ value: 3, name: '进行中' },
		{ value: 4, name: '已暂停' },
		{ value: 5, name: '已取消' },
		{ value: 6, name: '已结束' }
	],
	projectCycleType: [
		{ value: 0, name: '天' },
		{ value: 1, name: '个月' }
	],
	authStatus: [
		{ value: 0, name: '未认证' },
		{ value: 1, name: '已认证' },
		{ value: 9, name: '认证失败' }
	],
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
