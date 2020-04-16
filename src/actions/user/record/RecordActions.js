import { reset, SubmissionError } from 'redux-form';
import _ from 'lodash';
import React, {Component} from 'react'
import { Alert } from 'react-native';
import {Loader} from '../../../components/common'
import { loginUser } from '../../login/LoginActions';
import * as Location from 'expo-location';
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

const redirectToHome = () => NavigatorService.navigate("Home");

const renderAlert = (title, message, func) => {
  Alert.alert(
    title,
    message,
    [
      {text: 'OK', onPress: func},
    ],
    { cancelable: false }
  )
}

export const createRecord =  (values) => {

    Location.requestPermissionsAsync().then((permission) => {
      let { status } = permission;
      if (status !== 'granted') {
        renderAlert(status, 'Permission to access location was denied', null);
      } else {
        Location.getCurrentPositionAsync({}).then(location => {
          if(location && location.coords) {
            const {latitude, longitude, accuracy} = location.coords;
            const current_location = {
              lat: latitude,
              lon: longitude
            }
            values["location"] = current_location;


            dispatch({type: PROJECT_CREATE});
            console.log('Checking Internet is there or not');

            NetInfo.fetch().then((status) => {
              console.log('Internet is there isConnected = ', status);
              if(status.isInternetReachable) {
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
                    dispatch({type: PROJECT_CREATE_F, payload: "Submision Failed"});
                    renderAlert('Submision Failed', "Report to your Administrator");
                    reject(new SubmissionError("Submision Failed"));
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
                      dispatch({type: PROJECT_CREATE_F, payload: "Failed"});
                    }
                  )
                }
                else {
                  console.log("Log ", 11);
                  renderAlert('Error', "Can't submit. Please sync 100 pending recorts before submitting a new one", redirectToHome);
                  dispatch({type: PROJECT_CREATE_F, payload: "Failed"});
                }
              }
            }).catch(err => {
              console.log('Error while fetching Net Info');
              
            })


          };

        }).catch(err => {
          dispatch({type: PROJECT_CREATE_F, payload: "Failed"});
          
          reject(new SubmissionError(err));
        })
      }
    }).catch(err => {
      
      dispatch({type: PROJECT_CREATE_F, payload: "Failed"});
      reject(new SubmissionError(err));
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
      dispatch({type: PROJECT_LIST_FETCH_SUCCESS, payload: projects.response});
    })
    .catch(err => {
      console.log(err);
      dispatch({type: PROJECT_LIST_FETCH_ERROR});
    })
}

export const deleteProject = (id) => {
  return project.remove(id);
}
