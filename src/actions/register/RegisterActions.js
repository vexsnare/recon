import * as session from '../../services/session';
import { SubmissionError } from 'redux-form';
import NavigatorService from '../../services/navigator';

export const registerUser = (values, dispatch) => {

  const { password, name, phone } = values;

  const registerData = {
    fullName: name,
    password,
    mobileNumber:phone,
    admin: 0,
    createdBy: "dummy"
  };

  return new Promise((resolve, reject) => {
    session.register(registerData)
    .then((user) => {
      resolve(user);
      NavigatorService.navigate("Records");
    }).catch((errorMessage) => {
      console.log('Failed to signup', errorMessage);
      reject(new SubmissionError({_error : errorMessage}));
    });
  });
};

export const updateUser = (values, dispatch) => {

  const { password, name, phone } = values;

  const registerData = {
    fullName: name,
    password,
    mobileNumber:phone,
    admin: 0,
    createdBy: "dummy"
  };

  return new Promise((resolve, reject) => {
    session.update(registerData)
    .then((user) => {
      resolve(user);
      NavigatorService.navigate("Records");
    }).catch((errorMessage) => {
      console.log('Failed to signup', errorMessage);
      reject(new SubmissionError({_error : errorMessage}));
    });
  });
};


export const registerAdmin = (values, dispatch) => {

  const { password, name, phone } = values;

  const registerData = {
    fullName: name,
    password,
    mobileNumber:phone,
    admin: 1,
    createdBy: "dummy"
  };

  return new Promise((resolve, reject) => {
    session.register(registerData)
    .then((user) => {
      resolve(user);
      NavigatorService.navigate("Records");
    }).catch((errorMessage) => {
      console.log('Failed to signup', errorMessage);
      reject(new SubmissionError({_error : errorMessage}));
    });
  });
};


export const updateAdmin = (values, dispatch) => {

  const { password, name, phone } = values;

  const registerData = {
    fullName: name,
    password,
    mobileNumber:phone,
    admin: 1,
    createdBy: "dummy"
  };
  return new Promise((resolve, reject) => {
    session.update(registerData)
    .then((user) => {
      resolve(user);
      NavigatorService.navigate("Records");
    }).catch((errorMessage) => {
      console.log('Failed to signup', errorMessage);
      reject(new SubmissionError({_error : errorMessage}));
    });
  });
};