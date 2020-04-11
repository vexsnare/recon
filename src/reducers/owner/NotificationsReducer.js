import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE
} from '../../actions/user/notifications/types';

const INITIAL_STATE = {
  data: null,
  error: null,
  loading: false
};

const NotificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        loading: true,
        error: null
      };
      case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false
      };
      case FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default NotificationsReducer;
