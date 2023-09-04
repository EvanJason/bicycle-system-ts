import { Select } from 'antd';
const Option = Select.Option;
export const common = {
	/**
	 *  time时间戳  获取日期格式 yyyy-MM-dd hh:mm:ss
	 * @param time
	 * @returns
	 */
	getDateFormatStyle(time) {
		if (!time) return '';
		let date = new Date(time);
		const y = date.getFullYear();
		let m: any = date.getMonth() + 1;
		let d: any = date.getDate();
		let h: any = date.getHours();
		let minute: any = date.getMinutes();
		let s: any = date.getSeconds();
		if (m < 10) m = '0' + m;
		if (d < 10) d = '0' + d;
		if (h < 10) h = '0' + h;
		if (minute < 10) minute = '0' + minute;
		if (s < 10) s = '0' + s;
		return `${y}-${m}-${d} ${h}:${minute}:${s}`;
	},

	/**
	 * time时间戳 获取时间格式 hh:mm:ss
	 * @param time
	 * @returns
	 */
	getTimeStyle(time) {
		if (!time) return '';
		let date = new Date(time);
		let h: any = date.getHours();
		let minute: any = date.getMinutes();
		let s: any = date.getSeconds();
		if (h < 10) h = '0' + h;
		if (minute < 10) minute = '0' + minute;
		if (s < 10) s = '0' + s;
		return `${h}:${minute}:${s}`;
	},

	/**
	 * time时间戳 获取日期格式 1990-01-01
	 * @param time
	 * @returns
	 */
	getDateStyle(time) {
		if (!time) return '';
		let date = new Date(time);
		const y = date.getFullYear();
		let m: any = date.getMonth() + 1;
		let d: any = date.getDate();
		if (m < 10) m = '0' + m;
		if (d < 10) d = '0' + d;
		return y + '-' + m + '-' + d;
	},

	/**
	 * 获取base64格式的文件
	 * @param file
	 * @returns
	 */
	getBase64(file: any) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	},

	/**
	 * 表格分页封装
	 * @param {*} data
	 * @param {*} callback
	 * @return {*}
	 */
	pagination(data, callback) {
		return {
			onChange: (current) => {
				callback(current);
			},
			current: data.page,
			pageSize: data.pageSize,
			total: data.total,
			showTotal: () => {
				return `共 ${data.total} 条`;
			},
			showQuickJumper: true,
		};
	},

	/**
	 * 格式化金额,单位:分(eg:430分=4.30元)
	 * @param fee
	 * @param suffix
	 * @returns
	 */
	formatFee(fee, suffix = '') {
		if (!fee) {
			return 0;
		}
		return Number(fee).toFixed(2) + suffix;
	},
	/**
	 * 格式化公里（eg:3000 = 3公里）
	 * @param mileage
	 * @param text
	 * @returns
	 */
	formatMileage(mileage, text) {
		if (!mileage) {
			return 0;
		}
		if (mileage >= 1000) {
			text = text || ' km';
			return Math.floor(mileage / 100) / 10 + text;
		} else {
			text = text || ' m';
			return mileage + text;
		}
	},
	/**
	 * 隐藏手机号中间4位
	 * @param phone
	 * @returns
	 */
	formatPhone(phone) {
		phone += '';
		return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2');
	},
	/**
	 * 隐藏身份证号中11位
	 * @param number
	 * @returns
	 */
	formatIdentity(number) {
		number += '';
		return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2');
	},

	/**
	 * 根据数组生成下拉选择项
	 * @param data 
	 * @returns 
	 */
	getOptionList(data) {
		if (!data) {
			return [];
		}
		let options = [];
		data.map((item) => {
			options.push(<Option value={item.id} key={item.id}>{item.name}</Option>);
		});
		return options;
	},
	/**
	 * LTable 行点击通用函数
	 * @param selectedRowKeys
	 * @param selectedRows
	 * @param selectedIds
	 */
	updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
		if (!selectedIds) {
			this.setState({
				selectedRowKeys,
				selectedItem: selectedRows,
			});
		} else {
			this.setState({
				selectedRowKeys,
				selectedIds: selectedIds,
				selectedItem: selectedRows,
			});
		}
	},
};

