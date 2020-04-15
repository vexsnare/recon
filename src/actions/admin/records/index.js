import * as adminService from '../../../services/admin/records';
import { store } from '../../../../Store';

export const FETCH_RECORDS = 'records/fetch';
export const FETCH_RECORDS_S = 'records/fetch_S';
export const FETCH_RECORDS_F = 'records/fetch_F';

export const getAllRecords = () => {
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

