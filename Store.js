import { createStore, combineReducers, applyMiddleware } from 'redux';
import dataReducer from './src/reducers';
import { AsyncStorage } from 'react-native';
import { reducer as formReducer } from 'redux-form';
import { reducer as servicesReducer } from './src/services/Reducer';
import { LOGOUT_USER_SUCCESS } from './src/actions/logout/types';
import { persistStore, autoRehydrate } from 'redux-persist';

const appReducer = combineReducers({
	data: dataReducer,
	form: formReducer,
	services: servicesReducer,
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
	autoRehydrate()
);

export const persist = persistStore(store, {
    storage: AsyncStorage,
    blacklist: ['form']
  }, () => {
		console.log("Store persisted");
	}
);

export default store;