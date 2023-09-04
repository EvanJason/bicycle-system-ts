import requestAjax from '../../axios';

class Service {
	async getMenuList(params?) {
		let result = await requestAjax.ajax({
			url: '/menuList',
			params: params,
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}
}

export const indexService = new Service();
