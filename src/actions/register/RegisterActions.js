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
      {text: 'OK', onPress: () => NavigatorService.navigate("RecordList") },
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
export const createAccount = (values, dispatch) => {
  const { password, name, phone, admin } = values;
  const registerData = {
    fullName: name,
    password,
    mobileNumber:phone,
    admin: admin,
    createdBy: "dummy"
  };
  return new Promise((resolve, reject) => {
    session.register(registerData)
    .then((user) => {
      renderAlert("Success", "Press Ok to go back to records.");
      store.dispatch(reset("signupFormAdmin"));
      resolve();
    }).catch(({errorMessage}) => {
      console.log('Failed to signup', errorMessage);
      reject(new SubmissionError({_error : errorMessage}));
    });
  });
};


//In use
export const updateAccount = (values, dispatch) => {
  const { password, phone, admin } = values;
  const updateData = {
    password,
    mobileNumber:phone,
    admin: admin,
    createdBy: "dummy"
  };
  return new Promise((resolve, reject) => {
    session.update(updateData)
    .then((user) => {
      renderAlert("Success", "Press Ok to go back to records.");
      store.dispatch(reset("updateFormAdmin"));
      resolve();
    }).catch(({errorMessage}) => {
      console.log('Failed to Register', errorMessage);
      reject(new SubmissionError({_error : errorMessage}));
    });
  });
};