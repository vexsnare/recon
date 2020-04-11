import { Actions } from 'react-native-router-flux';
import {
  TASK_FETCH_SUCCESS,
  TASK_FETCH_ERROR,
  TASK_FETCHING,
  WORK_SELECTED
} from './types';
import * as tasks from '../../../services/supervisor/task';

export const fetchTasks = () => {
  return (dispatch) => {
    dispatch({type: TASK_FETCHING});
    tasks.fetch()
    .then((tasks) => {
      dispatch({type: TASK_FETCH_SUCCESS, payload: tasks});
    })
    .catch(err => {
      dispatch({type: TASK_FETCH_ERROR});
    })
  }
}
