import {
  FETCH_INPUT,
  FETCH_INPUT_SUCCESS,
  FETCH_INPUT_FAILURE
} from '../../actions/user/progress/types';

const INITIAL_STATE = {
  data: null,
  error: null,
  loading: false
};

const InputProgressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_INPUT:
      return {
        ...state,
        loading: true,
        error: null
      };
      case FETCH_INPUT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false
      };
      case FETCH_INPUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default InputProgressReducer;
