import { reset, SubmissionError } from 'redux-form';
import _ from 'lodash';
import React, {Component} from 'react'
import { Alert } from 'react-native';
import {Loader} from '../../../components/common'
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
  PROJECT_LIST_ADD,  
  SUBMIT_REPORT_OFFLINE
} from './types';
import * as project from '../../../services/owner/project';
import NavigatorService from '../../../services/navigator';
import { store } from '../../../../Store';
import {getNested} from '../../../utils';
import NetInfo from '@react-native-community/netinfo';
const { dispatch} = store;

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const renderAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
}

const renderLoader = (state) => {
  return <Loader loading={true} />;
}

export const createRecord =  (values) => {
  console.log(values, "Create Report Called")
  
    renderLoader(true);
    console.log('Checking Internet is there or not');
    NetInfo.fetch().then((status) => {
      console.log('Internet is there isConnected = ', status);
      if(status.isInternetReachable) {
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
      } else {
        console.log('Checking Internet... not connected');
        console.log("Log ", 0);
        const offlineReports = getNested(store.getState(), 'data.offline.records');
        console.log("Log ", 1);
        if(_.size(offlineReports) <= 100) {
          console.log("Log ", 2);
          sleep(1500).then ( () => {
              console.log('No Internet Submitting offLine');
              dispatch({type: SUBMIT_REPORT_OFFLINE, payload: values});
              renderAlert('Submitted offLine', "Please sync your reports once you are connected to Internet");
              <Loader visible={false} />
            }
          )
        }
        else {
          console.log("Log ", 11);
          renderAlert('Error', "Can't submit. Please sync 100 pending recorts before submitting a new one");
          <Loader visible={false} />
        }
      }
    }).catch(err => {
      console.log('Error while fetching Net Info');
      <Loader visible={false} />
    })
  }


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
