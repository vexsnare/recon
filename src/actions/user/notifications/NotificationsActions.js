import { Actions } from 'react-native-router-flux';
import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATIONS_SUCCESS,

} from './types';

import * as notifications from '../../../services/owner/notification';

export const fetchNotifications = () => {
  return (dispatch) => {
    dispatch({type: FETCH_NOTIFICATIONS});
    notifications.get()
    .then((notifications) => {
      dispatch({
        type: FETCH_NOTIFICATIONS_SUCCESS,
        payload: notifications
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_NOTIFICATIONS_FAILURE,
        payload: error
      });
    });
  };
};
