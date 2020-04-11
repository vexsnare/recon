import {
  SUBMIT_REPORT_OFFLINE,
  REMOVE_REPORT_FROM_OFFLINE
} from '../actions/admin/report/types';

const INITIAL_STATE = {
  reports: {
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUBMIT_REPORT_OFFLINE:
      const current_date = new Date();
      const current_time = current_date.getTime();
      const midnight_time = current_date.setHours(0,0,0,0);
      for(var t in state.reports) {
        if( t >= midnight_time && t <= current_time) {
          delete state.reports[t]
        }
      }
      state.reports[current_time] = action.payload;
      return { ...state };
    case REMOVE_REPORT_FROM_OFFLINE:
      const key = action.payload;
      delete state.reports[key]
      return { ...state };
    default:
      return state;
  }
};
