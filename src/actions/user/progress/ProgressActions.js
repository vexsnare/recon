import { Actions } from 'react-native-router-flux';
import {
  FETCH_REPORT,
  FETCH_REPORT_FAILURE,
  FETCH_REPORT_SUCCESS,

  FETCH_INPUT,
  FETCH_INPUT_FAILURE,
  FETCH_INPUT_SUCCESS,

  FETCH_OUTPUT,
  FETCH_OUTPUT_FAILURE,
  FETCH_OUTPUT_SUCCESS,

  FETCH_PRODUCTIVITY,
  FETCH_PRODUCTIVITY_FAILURE,
  FETCH_PRODUCTIVITY_SUCCESS,

  FETCH_SUMMARY,
  FETCH_SUMMARY_FAILURE,
  FETCH_SUMMARY_SUCCESS,

} from './types';

import * as progress from '../../../services/owner/progress';

export const fetchReport = ({ project_id, date }) => {
  return (dispatch) => {
    dispatch({type: FETCH_REPORT});
    progress.fetchReport(project_id, date)
    .then((report) => {
      dispatch({
        type: FETCH_REPORT_SUCCESS,
        payload: report
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_REPORT_FAILURE,
        payload: error
      });
    });
  };
};


export const fetchInput = ({ project_id, sincedate }) => {
  return (dispatch) => {
    dispatch({type: FETCH_INPUT});
    progress.fetchInput(project_id, sincedate)
    .then((report) => {
      dispatch({
        type: FETCH_INPUT_SUCCESS,
        payload: report
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_INPUT_FAILURE,
        payload: error
      });
    });
  };
};

export const fetchSummary = ({ project_id }) => {
  return (dispatch) => {
    dispatch({type: FETCH_SUMMARY});
    progress.fetchSummary(project_id)
    .then((report) => {
      dispatch({
        type: FETCH_SUMMARY_SUCCESS,
        payload: report
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_SUMMARY_FAILURE,
        payload: error
      });
    });
  };
};

export const fetchOutput = ({ project_id, sincedate }) => {
  return (dispatch) => {
    dispatch({type: FETCH_OUTPUT});
    progress.fetchOutput(project_id, sincedate)
    .then((report) => {
      dispatch({
        type: FETCH_OUTPUT_SUCCESS,
        payload: report
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_OUTPUT_FAILURE,
        payload: error
      });
    });
  };
};

export const fetchProductivity = ({ project_id }) => {
  return (dispatch) => {
    dispatch({type: FETCH_PRODUCTIVITY});
    progress.fetchProductivity(project_id)
    .then((report) => {
      dispatch({
        type: FETCH_PRODUCTIVITY_SUCCESS,
        payload: report
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_PRODUCTIVITY_FAILURE,
        payload: error
      });
    });
  };
};
