import { combineReducers } from 'redux';
import ProjectReducer from './ProjectReducer';
import ProjectListReducer from './ProjectListReducer';
import ProgressReducer from './ProgressReducer';
import NotificationsReducer from './NotificationsReducer';

export default combineReducers({
  project: ProjectReducer,
  projectList: ProjectListReducer,
  progress: ProgressReducer,
  notifications: NotificationsReducer
});
