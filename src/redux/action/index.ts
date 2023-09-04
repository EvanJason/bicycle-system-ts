/**
 * Action 类型(这里只设置一个，可以有多个)
 */
export const type = {
	SWITCH_MENU: 'SWITCH_MENU', //切换目录菜单
};

export function switchMenu(menuName) {
	return {
		type: type.SWITCH_MENU,
		menuName,
	};
}
