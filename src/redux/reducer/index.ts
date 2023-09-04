/**
 * Reducer 数据处理
 */

import { type } from '../action';

const initialState = {
	menuName: window.localStorage.menuTitle || '数据分析',
};

const reducer = (state = initialState, action) => {
	if (action.menuName) {
		window.localStorage.menuTitle = action.menuName;
	}

	switch (action.type) {
		case type.SWITCH_MENU:
			return {
				...state,
				menuName: action.menuName,
			};
		default:
			return {
				...state,
			};
	}
};

export default reducer;
