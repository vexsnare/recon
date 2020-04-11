import {
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER,
} from '../actions/logout/types';

const INITIAL_STATE = { error: null, loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return { ...state, loading: true };
    case LOGOUT_USER_FAIL:
      return { ...state, error: null, loading: false };
    case LOGOUT_USER_SUCCESS:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};
