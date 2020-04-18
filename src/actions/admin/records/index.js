import * as adminService from '../../../services/admin/records';
import { store } from '../../../../Store';

export const FETCH_RECORDS = 'records/fetch';
export const FETCH_RECORDS_S = 'records/fetch_S';
export const FETCH_RECORDS_F = 'records/fetch_F';
export const UPDATE_TO_EDIT_RECORD= 'records/UPDATE_TO_EDIT_RECORD';
export const RECORD_LIST_ADD = 'record/list/add';

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


