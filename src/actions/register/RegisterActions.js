import * as session from '../../services/session';
import { SubmissionError } from 'redux-form';
import NavigatorService from '../../services/navigator';

const splitName = (fullName) => {
  if (!fullName) return [null, null];
  const splited = fullName.trim().split(/\s+/);
  const firstName = splited.slice(0, splited.length > 1 ? -1 : 1).join(' ');
  const lastName = splited.length > 1 ? splited.slice(-1).join('') : null;
  return [firstName, lastName];
};

export const registerUser = (values, dispatch) => {

  const { email, password, name, contact_number } = values;

  const registerData = {
    email,
    password,
    first_name: splitName(name)[0],
    last_name: splitName(name)[1],
    contact_number,
    role: 'user'
  };

  return new Promise((resolve, reject) => {
    session.register(registerData)
    .then((user) => {
      resolve(user);
      if(user.role === 'user') {
        NavigatorService.reset('projectList');
      }
      else {
        NavigatorService.reset('taskList');
      }
    }).catch((errorMessage) => {
      console.log('Failed to signup', errorMessage);
      reject(new SubmissionError({_error : errorMessage}));
    });
  });
};
