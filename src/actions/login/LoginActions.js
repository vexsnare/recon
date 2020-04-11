
import NavigatorService from '../../services/navigator';
import { SubmissionError } from 'redux-form';
import * as session from '../../services/session';

export const loginUser = (values, dispatch) => {
  var { login, password } = values;
  login = login.trim();
  password = password.trim();
  return new Promise((resolve, reject) => {
    session.authenticate(login, password)
    .then((user) => {
      resolve(user);
      if(user.role === 'user') {
        NavigatorService.reset('recordList');
      }
      else {
        NavigatorService.reset('home');
      }
    }).catch((errorMessage) => {
      reject(new SubmissionError({_error: errorMessage}));
    });
  });
};
