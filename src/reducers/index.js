import { combineReducers } from 'redux';
import LogoutReducer from './LogoutReducer';
import RegisterReducer from './RegisterReducer';
import OfflineReducer from './OfflineReducer';
import recordsReducer from './admin/recordsReducer';


const AdminReducer = combineReducers({
  records: recordsReducer
})

export default combineReducers({
  register: RegisterReducer,
  logout: LogoutReducer,
  offline: OfflineReducer,
  admin: AdminReducer
});