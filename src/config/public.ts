/* 当前环境变量 */
const env = process.env.NODE_ENV === 'development' ? 'local' : process.env.NODE_ENV === 'production' ? 'test' : 'prod';

/* timeout 请求超时时间 */
const local = {
	baseUrl: 'https://www.fastmock.site/mock/85542fc5f043bb9f8b6120742f4e6c87/mockapi',
	juejinUrl: 'https://e.juejin.cn',
	timeout: 5000,
};

const test = {
	baseUrl: 'https://www.fastmock.site/mock/85542fc5f043bb9f8b6120742f4e6c87/mockapi',
	juejinUrl: 'https://e.juejin.cn',
	timeout: 5000,
};

const prod = {
	baseUrl: 'https://www.fastmock.site/mock/85542fc5f043bb9f8b6120742f4e6c87/mockapi',
	juejinUrl: 'https://e.juejin.cn',
	timeout: 5000,
};
/* 每次更新版本都要修改 */
const version = '1.0.0';

/* 表单的布局 */
const formItemLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 19 },
};

export class Config {
	/**
	 * 获取服务端地址，及其他api地址
	 * @returns
	 */
	static get() {
		let config = { local, test, prod };
		return config[env];
	}
	/**
	 * 获取版本号
	 * @returns
	 */
	static getVersion() {
		return version;
	}

	/**
	 * 获取表单栅格布局
	 * @returns
	 */
	static getFormLayout() {
		return formItemLayout;
	}
}
