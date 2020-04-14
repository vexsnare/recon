import * as actionTypes from './ActionTypes';

const INITIAL_STATE = {
	tokens: null,
	isLogin: false,
	user: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return {...state, tokens: action.payload.tokens, user: action.payload.user, isLogin: action.payload.isLogin};
		case actionTypes.RESET:
			return {...INITIAL_STATE };
		case 'CLEAR_SESSION':
			return { ...INITIAL_STATE };
		default:
			return state;
	}
};
