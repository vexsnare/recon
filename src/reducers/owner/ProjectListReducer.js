import {
  PROJECT_LIST_FETCHING,
  PROJECT_LIST_FETCH_SUCCESS,
  PROJECT_LIST_FETCH_ERROR,
  TAKE_A_TOUR,
  TAKE_A_TOUR_ALERT,
  TAKE_A_TOUR_DONE
} from '../../actions/user/project/types';

const INITIAL_STATE = {
  fetching: false,
  error: false,
  take_a_tour_alert: false,
  take_a_tour: false,
  projectList: {}
};

const ProjectListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_LIST_FETCHING:
      return {
        ...state,
        fetching: true,

      };
      case PROJECT_LIST_FETCH_SUCCESS:
        return {
          ...state,
          fetching: false,
          error: false,
          projectList: action.payload
        };
      case PROJECT_LIST_FETCH_ERROR:
        return {
          ...state,
          fetching: false,
          error: true
        }
      case TAKE_A_TOUR_ALERT:
        return {
          ...state,
          take_a_tour_alert: true
        }
      case TAKE_A_TOUR:
        return {
          ...state,
          take_a_tour: true,
          take_a_tour_alert: false
        }
      case TAKE_A_TOUR_DONE:
        return {
          ...state,
          take_a_tour: false
        }
    default:
      return state;
  }
};

export default ProjectListReducer;
