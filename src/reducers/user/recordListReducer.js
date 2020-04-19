import {
    FETCH_RECORDS,
    FETCH_RECORDS_S,
    FETCH_RECORDS_F
} from '../../actions/admin/records';
import {
  RECORD_LIST_ADD,
  RECORD_UPDATE_OFFLINE
} from '../../actions/user/record/types'

const INITIAL_STATE = { error: null, loading: false, records:[] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RECORDS:
      return { ...state, loading: true };
    case RECORD_LIST_ADD:
      var recordList = state.records ? state.records : [];
      recordList = recordList.slice(0, 39);
      return { ...state, records: [action.payload, ...recordList ]};
    case FETCH_RECORDS_S:
      return { ...state, error: null, loading: false, records: action.data};
    case FETCH_RECORDS_F:
      return { ...state, loading: false, error: action.data };
    case RECORD_UPDATE_OFFLINE:
      var recordToUpdate = action.payload;
      var recordList = [];
      var record;
      for(record of state.records) {
        if(record.id == recordToUpdate.id) {
          recordList.push(recordToUpdate);
        } else recordList.push(record);
      }
      return { ...state, records: recordList};
    default:
      return state;
  }
};


  