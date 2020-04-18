import * as actionTypes from './ActionTypes';

const INITIAL_STATE = {
	tokens: null,
	isLogin: false,
	user: null,
	myAdmin: null
};

export const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return {...state, tokens: action.payload.tokens, user: action.payload.user, isLogin: action.payload.isLogin};
		
		case actionTypes.RESET:
			return {...INITIAL_STATE };
		
		case actionTypes.FETCH_MY_ADMIN:
			console.log("action", action);
			return { ...state, myAdmin: action.payload.response };

		case actionTypes.CLEAR_SESSION:
			return { ...INITIAL_STATE  };
		default:
			return state;
	}
};
