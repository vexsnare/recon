import {
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER,
 } from './types';
 import NavigatorService from '../../services/navigator';

import * as session from '../../services/session';

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({type: LOGOUT_USER});
    session.signOut()
    .then(() => {
      console.log('@@@Success');
      dispatch({
        type: LOGOUT_USER_SUCCESS
      });
      NavigatorService.reset('auth');

    }).catch((errorMessage) => {
      console.log('@@@Error', errorMessage);
      NavigatorService.navigate('auth');

      dispatch({
        type: LOGOUT_USER_FAIL,
        payload: errorMessage
      });
    });
  };
};
