import requestAjax from '../../axios';

class tableService {
	async getTableList() {
		let result = await requestAjax.ajax({
			url: '/table/list',
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}

	async getTablePageList(params) {
		let result = await requestAjax.ajax({
			url: '/table/listPage',
			params: params,
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}

	async getHighTableList() {
		let result = await requestAjax.ajax({
			url: '/table/high/list',
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}

	async getHighTableList2() {
		let result = await requestAjax.ajax({
			url: '/table/high/list2',
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}

	async getHighTableList3() {
		let result = await requestAjax.ajax({
			url: '/table/high/list3',
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}
}

export const tableServices = new tableService();
