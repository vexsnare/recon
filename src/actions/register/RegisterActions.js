import * as session from '../../services/session';
import { SubmissionError } from 'redux-form';
import { Alert} from 'react-native';
import NavigatorService from '../../services/navigator';
import { store } from './../../../Store';
import { reset } from 'redux-form';

const renderAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [
      {text: 'OK', onPress: () => NavigatorService.navigate("Records") },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      }
    ],
    { cancelable: true }
  )
}

//In use
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
    .then(() => {
      renderAlert("Success", "Press Ok to go back to records.");
      store.dispatch(reset("signupForm"));
      resolve();
    }).catch((errorMessage) => {
      console.log('Failed to signup', errorMessage);
      reject(new SubmissionError({_error : errorMessage}));
    });
  });
};

//In use
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
      renderAlert("Success", "Press Ok to go back to records.");
      store.dispatch(reset("signupFormAdmin"));
      resolve();
    }).catch((errorMessage) => {
      console.log('Failed to signup', errorMessage);
      reject(new SubmissionError({_error : errorMessage}));
    });
  });
};
