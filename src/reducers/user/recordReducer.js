import {
    UPDATE_TO_EDIT_RECORD
  } from '../../actions/admin/records/index';
  import {
    RECORD_CREATE,
    RECORD_CREATE_F,
    RECORD_CREATE_S
  } from '../../actions/user/record/types';
  const INITIAL_STATE = { toEditRecord: {}, error: null, record: null, loading: false, message: null };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case UPDATE_TO_EDIT_RECORD:
        return { ...state, toEditRecord: action.payload };
      case RECORD_CREATE:
          return { ...state, loading: true, error: null };
      case RECORD_CREATE_S:
          return { ...state, loading: false, error: action.payload };
      case RECORD_CREATE_F:
          return { ...state, loading: false, error: null, message: action.payload };
      default:
        return state;
    }
  };
  
  
    