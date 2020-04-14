
import { SubmissionError } from 'redux-form';
import * as session from '../../services/session';
import {UPDATE} from './types';
import { connect } from 'react-redux';

export const loginUser = (values, dispatch) => {
  var { login, password } = values;
  password = password.trim();
  return new Promise((resolve, reject) => {
    session.authenticate(login, password)
    .then((user) => {
        user = resolve(user);
        console.log("Login success: " + user);
    }).catch((errorMessage) => {
      reject(new SubmissionError({_error: errorMessage}));
    });
  });
};
