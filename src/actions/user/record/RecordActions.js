import { reset, SubmissionError } from 'redux-form';
import { loginUser } from '../../login/LoginActions';
import {
  PROJECT_CREATED,
  PROJECT_FETCHING,
  PROJECT_FETCH_SUCCESS,
  PROJECT_FETCH_ERROR,
  PROJECT_LIST_FETCH_SUCCESS,
  PROJECT_LIST_FETCH_ERROR,
  PROJECT_LIST_FETCHING,
  TAKE_A_TOUR_ALERT,
  TAKE_A_TOUR,
  TAKE_A_TOUR_DONE
} from './types';
import * as project from '../../../services/owner/project';
import NavigatorService from '../../../services/navigator';


export const createRecord =  (values, dispatch) => {
  return new Promise((resolve, reject) => {
    console.log("Record: ", values);
    project.create(values)
    .then((project) => {
      NavigatorService.navigate("User");
      dispatch({type: PROJECT_FETCH_SUCCESS, payload: project});
      fetchNewProjectList(dispatch);
      dispatch({type: TAKE_A_TOUR_ALERT});
      resolve();
    })
    .catch((err) => {
      console.log(err);
      reject(new SubmissionError(err));
    });
  });
};

export const updateProject = (values, id, dispatch) => {
  return new Promise((resolve, reject) => {
    project.update(values, id)
    .then(() => {
      NavigatorService.back();
      fetchNewProject(dispatch, id);
      fetchNewProjectList(dispatch);
      resolve();
    })
    .catch((err) => {
      console.log(err);
      reject(new SubmissionError(err));
    });
  });
};

export const fetchProject = (project_id) => {
  return (dispatch) => {
    dispatch({type: PROJECT_FETCHING});
    project.get(project_id)
    .then((project) => {
      dispatch({type: PROJECT_FETCH_SUCCESS, payload: project});
    })
    .catch((err) => {
      dispatch({type: PROJECT_FETCH_ERROR})
    });
  }
};

export const fetchNewProject = (dispatch, project_id) => {
    dispatch({type: PROJECT_FETCHING});
    project.get(project_id)
    .then((project) => {
      dispatch({type: PROJECT_FETCH_SUCCESS, payload: project});
    })
    .catch((err) => {
      dispatch({type: PROJECT_FETCH_ERROR})
    });
};

export const fetchProjectList = () => {
  return (dispatch) => {
    dispatch({type: PROJECT_LIST_FETCHING});
    project.fetch()
    .then((projects) => {
      dispatch({type: PROJECT_LIST_FETCH_SUCCESS, payload: projects});
    })
    .catch(err => {
      console.log(err);
      dispatch({type: PROJECT_LIST_FETCH_ERROR});
    })
  }
}

export const fetchNewProjectList = (dispatch) => {
    dispatch({type: PROJECT_LIST_FETCHING});
    project.fetch()
    .then((projects) => {
      dispatch({type: PROJECT_LIST_FETCH_SUCCESS, payload: projects});
    })
    .catch(err => {
      console.log(err);
      dispatch({type: PROJECT_LIST_FETCH_ERROR});
    })
}

export const deleteProject = (id) => {
  return project.remove(id);
}
