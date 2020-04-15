import {
  PROJECT_LIST_FETCHING,
  PROJECT_LIST_FETCH_SUCCESS,
  PROJECT_LIST_FETCH_ERROR,
  PROJECT_LIST_ADD
} from '../../actions/user/record/types';

const INITIAL_STATE = { error: null, loading: false, records: undefined };
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_LIST_FETCHING:
      return { ...state, loading: true };
    case PROJECT_LIST_ADD:
          const recordList = state.records ? state.records : [];
          recordList.push(action.payload);
      return { ...state, records: [...recordList]};
    case PROJECT_LIST_FETCH_SUCCESS:
      records.add(action.data);
      return { ...state, error: null, loading: false, records: records};
    case PROJECT_LIST_FETCH_ERROR:
      return { ...state, loading: false, error: action.data };
    default:
      return state;
  }
};
