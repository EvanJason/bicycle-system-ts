import requestAjax from '../../axios';

class OrderService {
	async getTableList(params?) {
		let result = await requestAjax.ajax({
			url: '/order/list',
			params: params,
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}

	async getDetail() {
		let result = await requestAjax.ajax({
			url: '/order/ebike_info',
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}

	async endOrder(params?) {
		let result = await requestAjax.ajax({
			url: '/order/finish_order',
			params: params,
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}

	async getOrderDetail(params?) {
		let result = await requestAjax.ajax({
			url: '/order/detail',
			params: params,
		});
		if (result.status === 200) {
			return result.data;
		}
		return {};
	}
}

export const orderService = new OrderService();
