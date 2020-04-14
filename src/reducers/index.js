import { combineReducers } from 'redux';
import LogoutReducer from './LogoutReducer';
import RegisterReducer from './RegisterReducer';
import OfflineReducer from './OfflineReducer';

export default combineReducers({
  register: RegisterReducer,
  logout: LogoutReducer,
  offline: OfflineReducer
});
