import * as api from './Api';
import _ from 'lodash';

export const fetch = () => {
  return new Promise((resolve, reject) => {
    api.fetchTasks()
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => {
      reject(err);
    });
  });
};
