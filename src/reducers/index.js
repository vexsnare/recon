import { combineReducers } from 'redux';
import LogoutReducer from './LogoutReducer';
import OwnerReducer from './owner';
import SupervisorReducer from './supervisor';
import OfflineReducer from './OfflineReducer';

export default combineReducers({
  logout: LogoutReducer,
  owner: OwnerReducer,
  supervisor: SupervisorReducer,
  offline: OfflineReducer
});
