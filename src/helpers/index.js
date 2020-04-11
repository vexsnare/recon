import store from '../../Store';
import { getNested } from '../utils';
import * as reportApi from '../services/supervisor/report';
import { Platform, NetInfo, Alert } from 'react-native';
import _ from 'lodash';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

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

export const syncReports = (reports) => {
  console.log('reports=', reports);
  return new Promise((resolve, reject) => {
    let next = 0;
    if(!_.isEmpty(reports)) {
      const timestamp = _.keys(reports)[0];
      console.log('_.keys(reports)',_.keys(reports));
      const report = reports[timestamp];
      console.log('processing report : ', timestamp);
      Promise.all(promises).then(() => {
        reportApi.send(report).then((res) => {
          console.log('Submitted report - ', timestamp);
          console.log('Before = ', reports);
          delete reports[timestamp];
          syncReports(reports).then(() => resolve(null)).catch(err => reject(err));
          console.log('After = ', reports);
        }).catch(err => {
          reject('Error on syncing report' , err);
        });
      }).catch(err => {
        reject('Error on syncing pictures' , err)
      })
    } else resolve('No more report');
  });
}

export const submitOfflineReports = (showLoader) => {
  showLoader = showLoader || false;
  const offlineReports = getNested(store.getState(), 'data.offline.reports');
  if(_.isEmpty(offlineReports) && showLoader) {
    renderAlert('Not required', 'All reports are already submitted');
    return;
  }
  isNetworkConnected()
   .then( isConnected => {
    if(isConnected) {
      if(showLoader) loaderHandler.showLoader('Syncing...');
      syncReports(offlineReports).then(() => {
        if(showLoader) renderAlert('Done', 'All offline reports have been sent to server.');
        loaderHandler.hideLoader();
      })
    } else {
      if(showLoader) renderAlert('No Internet', 'Please connect to Internet and try again');
    }
   });
}

export function isNetworkConnected() {
  if (Platform.OS === 'ios') {
    return new Promise(resolve => {
      const handleFirstConnectivityChangeIOS = isConnected => {
        NetInfo.isConnected.removeEventListener('change', handleFirstConnectivityChangeIOS);
        resolve(isConnected);
      };
      NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChangeIOS);
    });
  }
  return NetInfo.isConnected.fetch();
}


  export const transformTitle = (title) => {
    if(title.length >= 15) {
      const titleArray = title.split(/\s*\/\s*|\s+/);
      let result = "";
      if(titleArray[0] == 'Excavation') {
        result =  "Excavation";
      } else if(titleArray[0] == 'Formwork') {
          result =  "Formwork";
      } else {
        for(var i = 0; i < titleArray.length; i++) {
          result += titleArray[i][0].toUpperCase();
        }
      }
      return result;
    }
    return title;
  }

export const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}
