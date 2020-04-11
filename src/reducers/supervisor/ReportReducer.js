import {
  ADD_RESOURCE_TO_REPORT,
  ADD_ACTIVITY_TO_REPORT,
  ADD_SITE_PICTURES_TO_REPORT,
  SUBMIT_REPORT,
  SUBMIT_REPORT_SUCCESS,
  SUBMIT_REPORT_FAILURE,
  UPLOAD_SITE_PICTURES,
  UPLOAD_SITE_PICTURES_SUCCESS,
  UPLOAD_SITE_PICTURES_FAILURE,
  REMOVE_WORK,
  REMOVE_PICTURES,
  REMOVE_RESOURCE,
  REMOVE_ACTIVITY,
  REMARK_CHANGE
} from '../../actions/admin/report/types';
import _ from 'lodash';

const INITIAL_STATE = {
  reported_works: {},
  site_pictures: [],
  remark: '',
  submitting: false,
  uploading: false,
  upload_error: null,
  submit_error: null
};

const ReportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RESOURCE_TO_REPORT:
      let { resource_id, resourceInput } = action.payload;

      if(!state.reported_works[action.payload.work_id]) {
        state.reported_works[action.payload.work_id] = {reported_resources: {}};
      } else if(state.reported_works[action.payload.work_id] && !state.reported_works[action.payload.work_id].reported_resources) {
        state.reported_works[action.payload.work_id]['reported_resources'] = {};
      }
      state.reported_works[action.payload.work_id].reported_resources[resource_id] = resourceInput;
      return {
        ...state
      };

    case ADD_ACTIVITY_TO_REPORT:

      let {activity_id, activityInput, activity_variation_id } = action.payload;
      if(!state.reported_works[action.payload.work_id]) {
        state.reported_works[action.payload.work_id] = {reported_activities: {}};
      } else if(state.reported_works[action.payload.work_id] && !state.reported_works[action.payload.work_id].reported_activities) {
        state.reported_works[action.payload.work_id]['reported_activities'] = {};
      }
      const new_activity_input = _.map(activityInput, (val) => {
          return {...val, ...activity_variation_id && {activity_variation_id} }
      });
      if(!state.reported_works[action.payload.work_id].reported_activities[activity_id]) {
        state.reported_works[action.payload.work_id].reported_activities[activity_id] = new_activity_input;
      }
      else {
          const activity_inputs = state.reported_works[action.payload.work_id].reported_activities[activity_id];
          const rest_activity_input = _.filter(activity_inputs, (activity_input) => activity_input.activity_variation_id != activity_variation_id )
          state.reported_works[action.payload.work_id].reported_activities[activity_id] = new_activity_input.concat(rest_activity_input);
      }
      return {
        ...state
      };

    case ADD_SITE_PICTURES_TO_REPORT:
      return { ...state, site_pictures: action.payload}
    case REMOVE_PICTURES:
      return { ...state, site_pictures: []}

    case REMARK_CHANGE:
      return { ...state, remark: action.payload}

    case REMOVE_WORK:
      delete state.reported_works[action.payload]
      return { ...state}

    case REMOVE_RESOURCE:
        delete state.reported_works[action.payload.work_id].reported_resources[action.payload.resource_id];
        if(_.isEmpty(state.reported_works[action.payload.work_id].reported_resources)) {
          delete state.reported_works[action.payload.work_id].reported_resources
        }
        if(_.isEmpty(state.reported_works[action.payload.work_id])) {
          delete state.reported_works[action.payload.work_id]
        }
        return { ...state}

    case REMOVE_ACTIVITY:
        delete state.reported_works[action.payload.work_id].reported_activities[action.payload.activity_id];
        if(_.isEmpty(state.reported_works[action.payload.work_id].reported_activities)) {
          delete state.reported_works[action.payload.work_id].reported_activities
        }
        if(_.isEmpty(state.reported_works[action.payload.work_id])) {
          delete state.reported_works[action.payload.work_id]
        }
        return { ...state}
    case UPLOAD_SITE_PICTURES:
        return { ...state, uploading: true}
    case UPLOAD_SITE_PICTURES_SUCCESS:
        return { ...state, uploading: false, uploading_error: null}
    case UPLOAD_SITE_PICTURES_FAILURE:
        return { ...state, uploading: false, uploading_error: action.payload}
    case SUBMIT_REPORT:
        return { ...state, submitting: true}
    case SUBMIT_REPORT_SUCCESS:
          return { ...state, submitting: false, submit_error: null}
    case SUBMIT_REPORT_FAILURE:
          return { ...state, submitting: false, submit_error: action.payload}
    default:
      return state;
  }
};

export default ReportReducer;
