import { combineReducers } from 'redux';
import ReportReducer from './ReportReducer';
import TasksReducer from './TasksReducer';
import ResourceCountReducer from './ResourceCountReducer';

export default combineReducers({
  report: ReportReducer,
  tasks: TasksReducer,
  resourceCount: ResourceCountReducer
});
