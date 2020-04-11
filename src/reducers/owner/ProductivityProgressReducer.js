import {
  FETCH_PRODUCTIVITY,
  FETCH_PRODUCTIVITY_SUCCESS,
  FETCH_PRODUCTIVITY_FAILURE
} from '../../actions/user/progress/types';

const INITIAL_STATE = {
  data: null,
  error: null,
  loading: false
};

const ProductivityProgressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTIVITY:
      return {
        ...state,
        loading: true,
        error: null
      };
      case FETCH_PRODUCTIVITY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false
      };
      case FETCH_PRODUCTIVITY_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default ProductivityProgressReducer;
