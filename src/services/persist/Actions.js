import * as actionTypes from './ActionTypes';

export const update = payload => ({
	type: actionTypes.UPDATE,
	payload,
});
