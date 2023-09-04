const menuList = [
	{
		title: '数据分析',
		key: '/home',
		type: 1,
	},
	{
		title: 'UI',
		key: '/ui',
		type: 1,
		children: [
			{
				title: '按钮',
				key: '/ui/buttons',
				type: 1,
			},
			{
				title: '弹框',
				key: '/ui/modals',
				type: 1,
			},
			{
				title: 'Loading',
				key: '/ui/loadings',
				type: 1,
			},
			{
				title: '通知提醒',
				key: '/ui/notification',
				type: 1,
			},
			{
				title: '全局Message',
				key: '/ui/messages',
				type: 1,
			},
			{
				title: 'Tab页签',
				key: '/ui/tabs',
				type: 1,
			},
			{
				title: '图片画廊',
				key: '/ui/gallery',
				type: 1,
			},
			{
				title: '轮播图',
				key: '/ui/carousel',
				type: 1,
			},
		],
	},
	{
		title: '表单',
		key: '/form',
		type: 1,
		children: [
			{
				title: '登录',
				key: '/form/login',
				type: 1,
			},
			{
				title: '注册',
				key: '/form/reg',
				type: 1,
			},
		],
	},
	{
		title: '表格',
		key: '/table',
		type: 1,
		children: [
			{
				title: '基础表格',
				key: '/table/basic',
				type: 1,
			},
			{
				title: '高级表格',
				key: '/table/high',
				type: 1,
			},
		],
	},
	{
		title: '富文本',
		key: '/rich',
		type: 1,
	},
	{
		title: '城市管理',
		key: '/city',
		type: 1,
	},
	{
		title: '订单管理',
		key: '/order',
		type: 1,
	},
	{
		title: '员工管理',
		key: '/user',
		type: 1,
	},
	{
		title: '车辆地图',
		key: '/bikeMap',
		type: 1,
	},
	{
		title: 'charts图表',
		key: '/charts',
		type: 1,
		children: [
			{
				title: '柱形图',
				key: '/charts/bar',
				type: 1,
			},
			{
				title: '饼图',
				key: '/charts/pie',
				type: 1,
			},
			{
				title: '折线图',
				key: '/charts/line',
				type: 1,
			},
			{
				title: '双Y轴图',
				key: '/charts/doubleY',
				type: 1,
			},
		],
	},
	{
		title: '权限设置',
		key: '/permission',
		type: 1,
	},
	{
		title: '项目列表',
		key: '/projects',
		type: 1,
	},
	{
		title: '前端热点',
		key: '/webKnow',
		type: 1,
	},
];
export default menuList;
