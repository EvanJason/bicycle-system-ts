import requestAjax from '../../axios';

class CityService {
	async getTableList(params) {
		let result = await requestAjax.ajax({
			url: '/open_city',
			params: params,
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}
}

export const cityService = new CityService();
