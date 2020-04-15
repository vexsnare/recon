import { reset, SubmissionError } from 'redux-form';
import { loginUser } from '../../login/LoginActions';
import {
  PROJECT_CREATE,
  PROJECT_CREATE_S,
  PROJECT_CREATE_F,
  PROJECT_FETCHING,
  PROJECT_FETCH_SUCCESS,
  PROJECT_FETCH_ERROR,
  PROJECT_LIST_FETCH_SUCCESS,
  PROJECT_LIST_FETCH_ERROR,
  PROJECT_LIST_FETCHING,
  PROJECT_LIST_ADD
} from './types';
import * as project from '../../../services/owner/project';
import NavigatorService from '../../../services/navigator';
import { store } from '../../../../Store';
const { dispatch} = store;

export const createRecord =  (values, dispatch) => {
  dispatch({type: PROJECT_CREATE});
  return new Promise((resolve, reject) => {
    console.log("Record: ", values);
    project.create(values)
    .then((data) => {
      dispatch({type: PROJECT_LIST_ADD, payload: data.response});
      dispatch({type: PROJECT_CREATE_S, payload: "Created Successfully"});
      NavigatorService.navigate("Home");
      resolve();
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: PROJECT_CREATE_F, payload: "Failed"});
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

export const fetchNewProjectList = () => {
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
