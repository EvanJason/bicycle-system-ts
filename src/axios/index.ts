import JsonP from 'jsonp';
import axios from 'axios';
import { message } from 'antd';
import { Config } from '../config/public';

interface options {
	url: string;
	method?: any;
	data?: any; //post参数
	params?: any; //get参数
	loading?: boolean;
}
/**
 * axios封装
 * @export
 * @class Axios
 */
export default class requestAjax {
	/**
	 * 主API
	 * @param options
	 * @returns
	 */
	static async ajax(options: options) {
		/* 设置loading效果显示 */
		let loading;
		if (!options.loading) {
			loading = document.getElementById('ajaxLoading');
			loading.style.display = 'block';
		}
		let baseApi = Config.get().baseUrl;
		let result = await axios({
			url: options.url,
			method: (options.method || 'GET').toUpperCase(),
			baseURL: baseApi,
			timeout: Config.get().timeout,
			params: options.params,
		});
		loading = document.getElementById('ajaxLoading');
		loading.style.display = 'none';
		return result;
	}
}
