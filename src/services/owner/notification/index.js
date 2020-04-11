import * as api from './Api';
import _ from 'lodash';

export const sendResigrationId = (deviceRegistrationId) => {
  console.log('sending device registration id: '+ deviceRegistrationId);
  const requestObj = {"device_registration_id": deviceRegistrationId};

  return new Promise((resolve, reject) => {
    api.sendResigrationId(requestObj)
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

export const get = () => {
  return new Promise((resolve, reject) => {
    api.getNotifications()
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}
