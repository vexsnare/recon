import { combineReducers } from 'redux';
import LogoutReducer from './LogoutReducer';
import OfflineReducer from './OfflineReducer';

export default combineReducers({
  logout: LogoutReducer,
  offline: OfflineReducer
});
