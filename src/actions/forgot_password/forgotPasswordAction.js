import { SubmissionError } from 'redux-form';
import * as session from '../../services/session';;
import {store} from '../../../Store';
import {FETCH_MY_ADMIN} from '../../services/session/ActionTypes';


export const forgotPassword = (values) => {
  console.log(" forgotPassword values = ", values);
  const username = values.username;
  return new Promise((resolve, reject) => {
    session.findMyAdmin(username)
    .then((data) => {
        store.dispatch({type: FETCH_MY_ADMIN, payload:data})
        resolve();
    }).catch((errorMessage) => {
      reject(new SubmissionError({_error: errorMessage}));
    });
  });
};


