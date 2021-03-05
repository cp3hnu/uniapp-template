/**
数据验证（表单验证）
来自 grace.hcoder.net 
作者 hcoder 深海
*/

import { isNumber, isInputNumber } from './verification.js'

const checks = {
	error: '',
	check: function(data, rule) {
		for (var i = 0; i < rule.length; i++) {
			// 如果rule没有checkType, name, errorMsg, 返回true
			const checkType = rule[i].checkType
			const name = rule[i].name
			const errorMsg = rule[i].errorMsg
			const checkRule = rule[i].checkRule
			if (!checkType || !name || !errorMsg) {
				return true
			}
			
			const value = data[rule[i].name]
			// 如果data中没有对应的属性返回false
			if (value === undefined) {
				this.error = errorMsg
				return false;
			}
			switch (checkType) {
				case 'truly': {
					if (!value) {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'notnull': {
					if (value == null) {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'notempty': {
					if (value == null || value === "") {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'phoneno': {
					const reg = /^[1][3456789][0-9]{9}$/
					if (!reg.test(value)) {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'captcha': {
					const reg = /^[0-9]{6}$/;
					if (!reg.test(value)) {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'true': {
					if (typeof(value) !== "boolean" || value === false) {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'reg': {
					const reg = new RegExp(checkRule);
					if (!reg.test(value)) {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'in': {
					if (checkRule.indexOf(value) == -1) {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'idCard': {
					const reg = /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x))+$/
					if (!reg.test(value)) {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'bankcard': {
					const reg = /^[1-9]\d{11,20}$/
					if (!reg.test(value)) {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'amount':{
					// 金额 
					if (!isInputNumber(value)) {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'listnotempty': {
					// 数组，长度大于0
					if (!Array.isArray(value) || value.length === 0) {
						this.error = errorMsg
						return false
					}
					break
				}
				case 'iddate': {
					 // 身份证时间格式
					 const reg = /^\d{4}\.\d{2}\.\d{2}-(\d{4}\.\d{2}\.\d{2}|长期)$/
					 if (!reg.test(value)) {
					 	this.error = errorMsg
					 	return false
					 }
					 break
				}
				case 'memberName': {
					 // 匹配中文/英文 && 12个字符内
					 const reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z_]){1,12}$/
					 if (!reg.test(value)) {
					 	this.error = errorMsg
					 	return false
					 }
					 break
				}
			}
		}
		return true;
	}
}
export default checks
