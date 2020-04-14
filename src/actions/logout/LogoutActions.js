import {
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER,
 } from './types';
import NavigatorService from '../../services/navigator';
import { store } from '../../../Store';

export const logoutUser = () => {
	  store.dispatch({ type: LOGOUT_USER_SUCCESS });    
    NavigatorService.navigate("Auth");
};
