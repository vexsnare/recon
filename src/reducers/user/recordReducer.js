import {
    PROJECT_CREATE,
    PROJECT_CREATE_S,
    PROJECT_CREATE_F
  } from '../../actions/user/record/types';
  const INITIAL_STATE = { error: null, loading: false, msg: null };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PROJECT_CREATE:
        return { ...state, loading: true };
      case PROJECT_CREATE_S:
        return { ...state, error: null, loading: false, msg: action.data};
      case PROJECT_CREATE_F:
        return { ...state, loading: false, error: action.data};
      default:
        return state;
    }
  };
  
  
    