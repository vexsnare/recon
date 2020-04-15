import { combineReducers } from 'redux';
import recordListReducer from './recordListReducer';
import recordReducer from './recordReducer';


export default combineReducers({
  records: recordListReducer,
  record: recordReducer
})
