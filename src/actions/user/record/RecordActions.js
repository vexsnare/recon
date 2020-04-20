import { reset, SubmissionError } from 'redux-form';
import _ from 'lodash';
import { makeRandomID } from './../../../helpers'
import React, {Component} from 'react'
import { Alert } from 'react-native';
import {Loader} from '../../../components/common'
import { loginUser } from '../../login/LoginActions';
import * as Location from 'expo-location';
import {
  RECORD_CREATE,
  RECORD_CREATE_S,
  RECORD_CREATE_F,
  RECORD_LIST_ADD,
  RECORD_UPDATE,
  RECORD_UPDATE_OFFLINE,
  RECORD_UPDATE_FAILURE,
  RECORD_UPDATE_SUCCESS,
  SUBMIT_REPORT_OFFLINE
} from './types';
import * as project from '../../../services/owner/project';
import NavigatorService from '../../../services/navigator';
import { store } from '../../../../Store';
import {getNested} from '../../../utils';
import NetInfo from '@react-native-community/netinfo';
import { getRecords } from '../../../actions/admin/records';
const { dispatch} = store;

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const addRandomIdAndMode = (values) => {
    values["id"] = makeRandomID(24);
    values["mode"] = "offline";
    return values;
}

const redirectToRecordList = () => NavigatorService.navigate("RecordList");

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

const transformValues = (values) => {
  const quarantineType = values.quarantineType ? values.quarantineType : "NONE";
  const contactType = values.contactType ? values.contactType : "NONE";
  return {...values, quarantineType, contactType, age: parseInt(values.age) }
}

export const createRecord =  (formValues) => {
    var values = transformValues(formValues);
    console.log("formValues", values);
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
            dispatch({type: RECORD_CREATE});
            console.log('Checking Internet is there or not');

            NetInfo.fetch().then((status) => {
              console.log('Internet is there isConnected = ', status);
              if(status.isConnected) {
                return new Promise((resolve, reject) => {
                  project.create(values)
                  .then((data) => {
                    dispatch({type: RECORD_LIST_ADD, payload: data.response});
                    dispatch({type: RECORD_CREATE_S, payload: "Created Successfully"});
                    redirectToRecordList();
                    resolve();
                  })
                  .catch(({errorMessage}) => {
                    dispatch({type: RECORD_CREATE_F, payload: errorMessage});
                    renderAlert('Submision Failed', errorMessage);
                    reject(new SubmissionError("Submision Failed"));
                  });
                });
              } else {
                console.log('Checking Internet... not connected');
                const offlineReports = getNested(store.getState(), 'data.offline.records');
                if(_.size(offlineReports) <= 250) {
                  sleep(1500).then ( () => {
                      values = addRandomIdAndMode(values);
                      console.log('No Internet Submitting offLine', values);
                      dispatch({type: RECORD_LIST_ADD, payload: values});
                      dispatch({type: SUBMIT_REPORT_OFFLINE, payload: values});
                      dispatch({type: RECORD_CREATE_F, payload: "Failed"});
                      redirectToRecordList();
                    }
                  )
                }
                else {
                  renderAlert('Error', "Can't submit. Please sync 250 pending recorts before submitting a new one", redirectToRecordList);
                  dispatch({type: RECORD_CREATE_F, payload: "Failed"});
                }
              }
            }).catch(err => {
              console.log('Error while fetching Net Info');
              reject(new SubmissionError(err));
            })
          };

        }).catch(err => {
          console.log('Error Unable to get position', err);
          dispatch({type: RECORD_CREATE_F, payload: "Failed"});
          
          reject(new SubmissionError(err));
        })
      }
    }).catch(err => {
      console.log('Error Unable to get location', err);
      dispatch({type: RECORD_CREATE_F, payload: "Failed"});
      reject(new SubmissionError(err));
    })
  }

const updateOfflineRecord = (values, id) => {
  values['id'] = id;
  dispatch({type: RECORD_UPDATE_OFFLINE, payload: values});
  return new Promise((resolve, reject) => {
    redirectToRecordList();
    resolve("UPDATED OFFLINE");
  })
}

export const updateRecord = (formValues, id, mode, dispatch) => {
  if(mode && mode == "offline") {
    return updateOfflineRecord(formValues, id);
  }
  const values = transformValues(formValues);
  //dispatch({type: RECORD_UPDATE});
  return new Promise((resolve, reject) => {
    project.update(values, id)
    .then((result) => {
      console.log("result = ", result);
      //dispatch({type: RECORD_UPDATE_SUCCESS});
      getRecords();
      redirectToRecordList();
      resolve(result.data);
    })
    .catch((err) => {
      console.log("err", err);
      //dispatch({type: RECORD_UPDATE_FAILURE})
      renderAlert('Error', "Can't submit. Make sure you have internet connection.", redirectToRecordList);
      reject(new SubmissionError(err));
    });
  });
};

export const deleteProject = (id) => {
  return project.remove(id);
}
