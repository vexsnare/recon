import { SubmissionError } from 'redux-form';
import * as session from '../../services/session';;

export const loginUser = (values) => {
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


