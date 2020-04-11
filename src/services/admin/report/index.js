import * as api from './Api';
import _ from 'lodash';

export const send = (report) => {
  return new Promise((resolve, reject) => {
    api.submitReport(report)
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => {
      reject(err);
    });
  });
};
