import * as adminService from '../../../services/admin/records';
import { store } from '../../../../Store';

export const FETCH_RECORDS = 'records/fetch';
export const FETCH_RECORDS_S = 'records/fetch_S';
export const FETCH_RECORDS_F = 'records/fetch_F';
export const UPDATE_TO_EDIT_RECORD= 'records/UPDATE_TO_EDIT_RECORD';


import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import { submitOfflineReports } from './../../../helpers';

function submitTask() {
    try {
      console.log("IN THREAD");
      submitOfflineReports(false);
      const backendData = "Simulated fetch " + Math.random();
      return backendData
        ? BackgroundFetch.Result.NewData
        : BackgroundFetch.Result.NoData;
    } catch (err) {
      return BackgroundFetch.Result.Failed;
    }
}

export async function initBackgroundFetch(taskName, taskFn, interval = 60*15) {
    console.log("IN ASYNC");
    try {
        if (!TaskManager.isTaskDefined(taskName)) {
            TaskManager.defineTask(taskName, taskFn);   
        }
        const options = {
            minimumInterval: interval // in seconds
        };
        await BackgroundFetch.registerTaskAsync(taskName, options);
    } catch (err) {
        console.log("registerTaskAsync() failed:", err);
    }
}

console.log("Hey..");
initBackgroundFetch("SubmitTask", submitTask);


export const getRecords = () => {
    store.dispatch({ type: FETCH_RECORDS })
    return new Promise((resolve, reject) => {
        adminService.getAllRecords()
      .then((records) => {
          store.dispatch({ type: FETCH_RECORDS_S, data: records })
      }).catch((errorMessage) => {
          console.log(errorMessage);
          store.dispatch({ type: FETCH_RECORDS_F, data: "Fetch Records Failed." })
      });
    });
};

export const recordToEdit = (record) => {
    store.dispatch({ type: UPDATE_TO_EDIT_RECORD, payload:record})
};


