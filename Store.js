import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createFilter, {createBlacklistFilter} from 'redux-persist-transform-filter';
import { persistStore, autoRehydrate } from 'redux-persist';
import dataReducer from './src/reducers';
import { reducer as servicesReducer } from './src/services/Reducer';
import * as persistActionCreators from './src/services/persist/Actions';
import { reducer as formReducer } from 'redux-form';
import { LOGOUT_USER_SUCCESS } from './src/actions/logout/types';

const appReducer = combineReducers({
	services: servicesReducer,
	data: dataReducer,
	form: formReducer
});

const rootReducer = (state, action) => {
	if (action.type === LOGOUT_USER_SUCCESS) {
		state = undefined
	}
	return appReducer(state, action)
}

const enhancer = compose(
	applyMiddleware(
		thunk
	)
);


export const store = createStore(
	rootReducer,
	enhancer,
	autoRehydrate()
);

const saveAndLoadSessionFilter = createFilter(
  'services',
  ['session'],
  ['session']
);

export const persist = persistStore(store, {
    storage: AsyncStorage,
    blacklist: ['form'],
		transforms: [saveAndLoadSessionFilter]
  }, () => {
		store.dispatch(persistActionCreators.update({ isHydrated: true }));
	}
);

export default store;
