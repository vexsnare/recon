import {
  FETCH_OUTPUT,
  FETCH_OUTPUT_SUCCESS,
  FETCH_OUTPUT_FAILURE
} from '../../actions/user/progress/types';

const INITIAL_STATE = {
  data: null,
  error: null,
  loading: false
};

const OutputProgressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_OUTPUT:
      return {
        ...state,
        loading: true,
        error: null
      };
      case FETCH_OUTPUT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false
      };
      case FETCH_OUTPUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default OutputProgressReducer;
