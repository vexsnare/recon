import {
  FETCH_SUMMARY,
  FETCH_SUMMARY_SUCCESS,
  FETCH_SUMMARY_FAILURE
} from '../../actions/user/progress/types';

const INITIAL_STATE = {
  data: null,
  error: null,
  loading: false
};

const SummaryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SUMMARY:
      return {
        ...state,
        loading: true,
        error: null
      };
      case FETCH_SUMMARY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false
      };
      case FETCH_SUMMARY_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default SummaryReducer;
