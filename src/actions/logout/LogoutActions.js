import {
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER,
 } from './types';
 import NavigatorService from '../../services/navigator';
import * as session from './../../services/session';

export const logoutUser = () => {
    console.log("Logout Called");
    session.signOut();
    NavigatorService.navigate("Auth");
};
