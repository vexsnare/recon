import _ from 'lodash';
import { RNS3 } from 'react-native-aws3';
import * as reportApi from '../../../services/supervisor/report';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import { isInternet } from '../../../helpers';
import { NetInfo, Platform, Alert } from 'react-native';
import { s3_options } from '../../../helpers/consts';
import NavigatorService from '../../../services/navigator';
import { isNetworkConnected, sleep } from '../../../helpers';
import { getNested } from '../../../utils';
import { store } from '../../../Store';
import {
  ADD_RESOURCE_TO_REPORT,
  ADD_ACTIVITY_TO_REPORT,
  ADD_SITE_PICTURES_TO_REPORT,
  SUBMIT_REPORT_OFFLINE,
  REMOVE_REPORT_FROM_OFFLINE,
  UPLOAD_SITE_PICTURES,
  UPLOAD_SITE_PICTURES_SUCCESS,
  UPLOAD_SITE_PICTURES_FAILURE,
  SUBMIT_REPORT,
  SUBMIT_REPORT_SUCCESS,
  SUBMIT_REPORT_FAILURE,
  REMOVE_WORK,
  REMOVE_RESOURCE,
  REMOVE_ACTIVITY,
  REMOVE_PICTURES,
  REMARK_CHANGE
} from './types';

export const remarkChange = (text) => {
  return {
    type: REMARK_CHANGE,
    payload: text
  }
}

export const addResourceToReport = (values, dispatch) => {
  NavigatorService.back({added_to_report: true});
  return {type: ADD_RESOURCE_TO_REPORT, payload: values};
}

export const addActivityToReport = (values, dispatch) => {
  NavigatorService.back({added_to_report: true});
  return {
    type: ADD_ACTIVITY_TO_REPORT,
    payload: values
  }
}

export const removeWork = (work_id) => {
  return {
    type: REMOVE_WORK,
    payload: work_id
  }
}

export const removeResource = (resource_id, work_id) => {
  return {
    type: REMOVE_RESOURCE,
    payload: {resource_id, work_id}
  }
}

export const removeActivity = (activity_id, work_id) => {
  return {
    type: REMOVE_ACTIVITY,
    payload: {activity_id, work_id}
  }
}

export const removePictures = () => {
  return {
    type: REMOVE_PICTURES
  }
}

export const addSitePicturesToReport = ({imageSources}) => {
  NavigatorService.back();
  return {
    type: ADD_SITE_PICTURES_TO_REPORT,
    payload: imageSources
  }
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

export const submit = (value) => {
  var report = transformReport(value);
  const cur_time = Date.now();
  report = {...report, reporting_time: cur_time/1000};
  return (dispatch) => {
    loaderHandler.showLoader("Submitting...");

    console.log('Checking Internet is there or not');
      // converting time from miliseconds to seconds
      isNetworkConnected().then((isConnected) => {
        console.log('Internet is there isConnected value = ', isConnected);
        if(isConnected) {
          dispatch({type: UPLOAD_SITE_PICTURES });
          const site_pictures = [];
          const promises = [];
          for(let i = 0; i < report.site_pictures.length; i++) {
            promises.push(new Promise((resolve, reject) => {
              RNS3.put(report.site_pictures[i], s3_options).then(response => {
                if (response.status !== 201)
                  throw new Error(`Failed to upload ${report.site_pictures[i].name} to S3`);
                const postResponse = response.body.postResponse;
                site_pictures.push(postResponse.location);
                resolve(null);
              }).catch((err) => {
                console.log('UPLOAD_SITE_PICTURES error = ', err);
              });
            }));
          }
          Promise.all(promises).then(() => {
            dispatch({type: UPLOAD_SITE_PICTURES_SUCCESS});
            report.site_pictures = site_pictures;
            dispatch({type: SUBMIT_REPORT});
            reportApi.send(report).then((res) => {
              console.log('submit report result', res);
              dispatch({type: SUBMIT_REPORT_SUCCESS});
              renderAlert('Submitted', 'Report Submitted Successfully.')
              loaderHandler.hideLoader();
            }).catch(err => {
              dispatch({type: SUBMIT_REPORT_FAILURE, err});
              renderAlert('Submission Failed', "Make sure you are adding atleast one resource or work of the day");
              loaderHandler.hideLoader();
            })
            console.log('site_pictures', site_pictures);
          }).catch(error => {
            dispatch({type: UPLOAD_SITE_PICTURES_FAILURE, payload: error})
            renderAlert('Error', "Pictures upload error");
            loaderHandler.hideLoader();
          });
      }
      else {
        const offlineReports = getNested(store.getState(), 'data.offline.reports');

          if(_.size(offlineReports) <= 15) {
            sleep(1500).then ( () => {
                console.log('No Internet Submitting offLine');
                dispatch({type: SUBMIT_REPORT_OFFLINE, payload: report});
                renderAlert('Submitted offLine', "Please sync your reports once you are connected to Internet");
                loaderHandler.hideLoader();
              }
            )
          }
          else {
            renderAlert('Error', "Can't submit. Please sync previous 15 days reports before submitting a new one")
            loaderHandler.hideLoader();
          }
      }
    }
   ).catch(err => {
     console.log('Error while fetching Net Info');
     loaderHandler.hideLoader();
   })
 }
}

const transformReport = (report) => {
  report = JSON.parse(JSON.stringify(report));
  const reported_works = _.map(report.reported_works, (value, key) => {
    if(value.reported_resources) {
      value.reported_resources = _.map(value.reported_resources, (input, id) => {
        return { reported_resource_inputs: [ ...input ], resource_id: id }
      })
    } else {
      value.reported_resources = [];
    }
    if(value.reported_activities) {
      value.reported_activities = _.map(value.reported_activities, (input, id) => {
        return { reported_activity_inputs: [ ...input ], activity_id: id }
      })
    } else {
      value.reported_activities = [];
    }
    return { ...value, work_id: key }
  });
  const site_pictures = report.site_pictures;
  const remark = report.remark;
  return {
      reported_works: [...reported_works],
      site_pictures: [...site_pictures],
      remark: remark
  }
}
