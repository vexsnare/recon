import {
  TASK_FETCHING,
  TASK_FETCH_SUCCESS,
  TASK_FETCH_ERROR,
} from '../../actions/admin/task/types';

const INITIAL_STATE = {
  fetching: false,
  error: false,
  tasks: {}
};

const TasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASK_FETCHING:
      return {
        ...state,
        fetching: true,
      };
      case TASK_FETCH_SUCCESS:
        return {
          ...state,
          fetching: false,
          error: false,
          tasks: action.payload
        };
      case TASK_FETCH_ERROR:
        return {
          ...state,
          fetching: false,
          error: true
        }
    default:
      return state;
  }
};

export default TasksReducer;
