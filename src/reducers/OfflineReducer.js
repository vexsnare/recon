import {
  SUBMIT_REPORT_OFFLINE,
  REMOVE_REPORT_FROM_OFFLINE
} from '../actions/user/record/types';
const INITIAL_STATE = { records: undefined };
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUBMIT_REPORT_OFFLINE:
      const recordList = state.records ? state.records : [];
      recordList.push(action.payload);
      return { ...state, records: [...recordList]};
    case REMOVE_REPORT_FROM_OFFLINE:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
