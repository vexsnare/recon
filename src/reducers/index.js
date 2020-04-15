import { combineReducers } from 'redux';
import LogoutReducer from './LogoutReducer';
import RegisterReducer from './RegisterReducer';
import OfflineReducer from './OfflineReducer';
import userRecordReducer from './user/userRecordReducer';
import recordsReducer from './admin/recordsReducer'


const AdminReducer = combineReducers({
  records: recordsReducer
})

const UserReducer = combineReducers({
  records: userRecordReducer
})


export default combineReducers({
  register: RegisterReducer,
  logout: LogoutReducer,
  offline: OfflineReducer,
  admin: AdminReducer,
  user: UserReducer
});