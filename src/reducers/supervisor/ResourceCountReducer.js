import {
  RESURCE_COUNT_CHANGED,
} from '../../actions/admin/report/types';

const INITIAL_STATE = 0;

const resourceCountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESURCE_COUNT_CHANGED:
      return action.payload;
    default:
      return state;
  }
};

export default resourceCountReducer;
