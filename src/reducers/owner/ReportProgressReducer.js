import {
  FETCH_REPORT,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_FAILURE
} from '../../actions/user/progress/types';

const INITIAL_STATE = {
  data: null,
  error: null,
  loading: false
};

const ReportProgressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_REPORT:
      return {
        ...state,
        loading: true,
        error: null
      };
      case FETCH_REPORT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false
      };
      case FETCH_REPORT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default ReportProgressReducer;
