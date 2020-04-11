import {
	UPDATE,
	RESET
} from './ActionTypes';

export const update = payload => ({
	type: actionTypes.UPDATE,
	payload
});

export const reset = () => ({
	type: actionTypes.RESET
});
