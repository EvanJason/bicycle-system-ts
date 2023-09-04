import requestAjax from '../../axios';

class MapService {
	async getTableList(params) {
		let result = await requestAjax.ajax({
			url: '/mapList',
			params: params,
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}
}

export const mapService = new MapService();
