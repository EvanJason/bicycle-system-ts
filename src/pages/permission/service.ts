import requestAjax from '../../axios';

class PermissionService {
	async getTableList() {
		let result = await requestAjax.ajax({
			url: '/role/list',
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}

	async addRole(params) {
		let result = await requestAjax.ajax({
			url: '/role/add',
			params: params,
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}

	async edit(params) {
		let result = await requestAjax.ajax({
			url: '/role/edit',
			params: params,
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}
}

export const permissionService = new PermissionService();
