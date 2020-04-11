import * as actionTypes from './ActionTypes';

const INITIAL_STATE = {
	'tokens': {
		'access-token': null,
		'uid': null,
		'client': null
	},
	user: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return {...state, tokens: action.payload.tokens, user: action.payload.user };
		case actionTypes.RESET:
			return {...INITIAL_STATE };
		case 'CLEAR_SESSION':
			return { ...INITIAL_STATE };
		default:
			return state;
	}
};
