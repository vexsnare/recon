import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CLEAR_ERROR
 } from './types';
import * as session from '../../services/session';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER});
    session.authenticate(email, password)
    .then((user) => {
      Actions.main();
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
      });
    }).catch((errorMessage) => {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: errorMessage
      });
    });
  };
};
