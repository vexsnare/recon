import { combineReducers } from 'redux';
import { reducer as sessionReducer } from './session/Reducer';
import { reducer as persistReducer } from './persist/Reducer';

export const reducer = combineReducers({
	session: sessionReducer,
	persist: persistReducer,
});
