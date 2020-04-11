import {
  PROJECT_FETCHING,
  PROJECT_FETCH_SUCCESS,
  PROJECT_FETCH_ERROR
} from '../../actions/user/project/types';

const INITIAL_STATE = {
  fetching: false,
  error: null,
  data: {}
};

const ProjectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_FETCHING:
      return {
        ...state,
        fetching: true,
      };
      case PROJECT_FETCH_SUCCESS:
        return {
          ...state,
          fetching: false,
          error: null,
          data: action.payload
        };
      case PROJECT_FETCH_ERROR:
        return {
          ...state,
          fetching: false,
          error: action.payload
        }
    default:
      return state;
  }
};

export default ProjectReducer;
