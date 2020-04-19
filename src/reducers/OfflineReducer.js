import {
  SUBMIT_REPORT_OFFLINE,
  REMOVE_REPORT_FROM_OFFLINE,
  RECORD_UPDATE_OFFLINE
} from '../actions/user/record/types';
const INITIAL_STATE = { records: undefined };
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUBMIT_REPORT_OFFLINE:
      var recordList = state.records ? state.records : [];
      recordList.push(action.payload);
      return { ...state, records: [...recordList]};
    case REMOVE_REPORT_FROM_OFFLINE:
      return { ...INITIAL_STATE };
    case RECORD_UPDATE_OFFLINE:
      var recordToUpdate = action.payload;
      var recordList = [];
      var record;
      for(record of state.records) {
        if(record.mode && record.id == recordToUpdate.id) {
          recordList.push(recordToUpdate);
        } else recordList.push(record);
      }
        return { ...state,  records: recordList};
    default:
      return state;
  }
};
