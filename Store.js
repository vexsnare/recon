import { createStore, combineReducers, applyMiddleware } from 'redux';
import dataReducer from './src/reducers';
import { reducer as formReducer } from 'redux-form';
import { LOGOUT_USER_SUCCESS } from './src/actions/logout/types';
import { composeWithDevTools } from 'redux-devtools-extension';

const appReducer = combineReducers({
	data: dataReducer,
	form: formReducer
});

const rootReducer = (state, action) => {
	if (action.type === LOGOUT_USER_SUCCESS) {
		state = undefined
	}
	return appReducer(state, action)
}

export const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export default store;