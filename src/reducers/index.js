import { combineReducers } from 'redux';
import LogoutReducer from './LogoutReducer';
import UserReducer from './user';
import AdminReducer from './admin';
import OfflineReducer from './OfflineReducer';

export default combineReducers({
  logout: LogoutReducer,
  user: UserReducer,
  admin: AdminReducer,
  offline: OfflineReducer
});
