import requestAjax from '../../axios';

class UserService {
	async getTableList(params?) {
		let result = await requestAjax.ajax({
			url: '/user/list',
			params: params,
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}

	/**
	 * 员工操作 编辑/添加/删除
	 * @param keyName
	 * @param params
	 * @returns
	 */
	async oprateUser(keyName, params?) {
		let result = await requestAjax.ajax({
			url: `/user/${keyName}`,
			params: params,
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}
}

export const userService = new UserService();
