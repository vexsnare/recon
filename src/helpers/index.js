import store from '../../Store';
import { getNested } from '../utils';
import { Alert } from 'react-native';
import _ from 'lodash';
import NetInfo from '@react-native-community/netinfo';
import * as api from '../services/owner/project/Api';
import {getRecords} from '../actions/admin/records';
import {
  REMOVE_REPORT_FROM_OFFLINE
} from '../actions/user/record/types';


export const runValidators = (value, validators) => {
  var error = '';
  for(let i = 0; i < validators.length; i++) {
    validate = validators[i];
    error = validate(value);
    if(error) {
      return error;
    }
  }
  return error;
}

export const renderAlert = (title, msg) => {
      Alert.alert(title, msg,
        [
          {text: 'OK', onPress: () => null}
        ]
      );
}

//In Use
export const syncReports = (reports) => {
  return new Promise((resolve, reject) => {
    api.submitPending(reports)
    .then((result) => {
      console.log(result);
      resolve(result.data);
    })
    .catch(err => {
      console.log(err);
      reject(err);
    });
  });
}

const transformValues = (values) => {
  const quarantineType = values.quarantineType ? values.quarantineType : "NONE";
  const contactType = values.contactType ? values.contactType : "NONE";
  return {...values, quarantineType, contactType, age: parseInt(values.age) }
}

//In use
export const submitOfflineReports = (showLoader) => {
  showLoader = showLoader || false;
  var offlineReports = getNested(store.getState(), 'data.offline.records');
  console.log("In offline records 1");
  if(_.isEmpty(offlineReports) && showLoader) {
    renderAlert('Not required', 'All reports are already submitted');
    return;
  }
  NetInfo.fetch()
   .then( state => {
    if(state.isConnected) {
      console.log("In offline records 5");
      if(showLoader) { console.log(showLoader)};
      offlineReports = offlineReports.map(x => transformValues(x));
      syncReports(offlineReports).then(() => {
        if(showLoader) renderAlert('Thank you', 'All offline reports have been sent to server.');
        getRecords();
        store.dispatch({type:REMOVE_REPORT_FROM_OFFLINE});
      })
    } else {
      if(showLoader) renderAlert('No Internet', 'You can do later when you have Internet');
    }
   });
}

//Inuse
export const makeRandomID = (length) => {
  length = length ? length : 24;
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

