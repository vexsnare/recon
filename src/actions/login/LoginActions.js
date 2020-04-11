
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
      if(user.role === 'owner') {
        NavigatorService.reset('projectList');
      }
      else {
        NavigatorService.reset('taskList');
      }
    }).catch((errorMessage) => {
      reject(new SubmissionError({_error: errorMessage}));
    });
  });
};
