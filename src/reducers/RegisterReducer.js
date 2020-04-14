import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER,
} from '../actions/register/types';

const INITIAL_STATE = { error: null, loading: false, status: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_FAIL:
      return { ...state, error: null, loading: false };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, error: null, status: "SUCCESS" };
    default:
      return state;
  }
};
