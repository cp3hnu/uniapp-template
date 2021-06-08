// 工具类
const fsm = uni.getFileSystemManager()

// 把base64数据写入文件，用于绘制小程序二维码
export function base64src() {
	return new Promise((resolve, reject) => {
		const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
		if (!format) {
			reject(new Error('ERROR_BASE64SRC_PARSE'));
		}
		const filePath = `${wx.env.USER_DATA_PATH}/${name}.${format}`;
		console.log("filePath = ", filePath)
		const buffer = uni.base64ToArrayBuffer(bodyData);
		fsm.writeFile({
			filePath,
			data: buffer,
			encoding: 'base64',
			success(res) {
				console.log("res = ", res)
				resolve(filePath);
			},
			fail() {
				reject(new Error('ERROR_BASE64SRC_WRITE'));
			},
		});
	});
};

// 手机号掩码 189****1234
export function maskedPhone(phone, space = '') {
	const len = phone.length
	if (len >= 11) {
		return phone.substring(0, 3) + space + "****" +  space + phone.substring(len - 4)
	}
	return phone
}

/*
 * 从其它类型转换成 Number 类型
 * 转换规则
 * Number类型直接返回
 * String类型，如果是空格，返回defaultValue；如果不是，调用Number()转换成Number类型，如果是NaN，返回defaultValue
 * Boolean类型，调用Number()转换成Number类型
 * 其它类型，返回defaultValue
 */
export function parseNumber(value, defaultValue = 0) {
	if (typeof value === 'number') {
		return value
	} else if (typeof value === 'string') {
		// 去掉所有空格
		const trimSpaceValue = value.replace(/\s/g, '')
		if (trimSpaceValue === '') {
			return defaultValue
		} else {
			const number = Number(trimSpaceValue)
			if (Number.isNaN(number)) {
				return defaultValue
			} else {
				return number
			}
		}
	} else if (typeof value === 'boolean') {
		return Number(value)
	}

	return defaultValue
}

/**
 *  提取 object 某些属性到一个对象
 *  var obj = {
		a: 1,
		b: 2,
		c: 3,
		d: 4
	};
 * extract(obj, 'c', 'b')
 * return { c: 3, b: 2 }
 */
export function extract(obj) {
  const o = {}
  const attr = Array.prototype.slice.call(arguments).slice(1)
  attr.forEach((val) => {
    if (val in obj) {
      o[val] = obj[val]
    }
  })
  return o
}

// 添加单位
export function addUnit(value, unit = 'rpx') {
	return `${value}${unit}`
}