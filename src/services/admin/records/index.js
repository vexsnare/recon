import * as api from './Api';

export const getAllRecords = () => {
  return new Promise((resolve, reject) => {
    api.getAllRecords()
    .then((result) => {
      console.log(result);
      resolve(result.data.response);
    })
    .catch(err => {
      console.log(err);
      reject(err);
    });
  });
};
