import {
    FETCH_RECORDS,
    FETCH_RECORDS_S,
    FETCH_RECORDS_F
} from '../../actions/admin/records';
import {
  RECORD_LIST_ADD
} from '../../actions/user/record/types'

const INITIAL_STATE = { error: null, loading: false, records:[] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RECORDS:
      return { ...state, loading: true };
    case RECORD_LIST_ADD:
          let recordList = state.records ? state.records : [];
          recordList = recordList.slice(0, 39);
          return { ...state, records: [action.payload, ...recordList ]};
    case FETCH_RECORDS_S:
      return { ...state, error: null, loading: false, records: action.data};
    case FETCH_RECORDS_F:
      return { ...state, loading: false, error: action.data };
    default:
      return state;
  }
};


  