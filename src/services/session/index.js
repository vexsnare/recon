import _ from 'lodash';
import axios from 'axios';
import { store } from '../../../Store';
import * as api from './Api';
import * as selectors from './Selectors';
import { getNested } from '../../utils';
import { isNetworkConnected } from '../../helpers';
import { CONNECTION_ERR_MESSAGE } from '../const';

import {
	UPDATE,
	RESET
} from './ActionTypes';

const clearSession = () => {
	try {
		store.dispatch({type: RESET});
	} catch(error) {
		console.log('Error while clearing user session', error);
	}
};

const dummyUser = {"id": "Test", "name": "Test User", "mobile": "11111111111"};
const onRequestSuccess = (response) => {
	const access_token = response.data.access_token;
	//const userData = dummyUser;
	//store.dispatch({ type: UPDATE, payload: { tokens: access_token, user: userData, isLogin: true } });
	return access_token;
};

const parseSignUpErrorResponse = (response) => {
	const fullMessages = getNested(response, 'data.errors.full_messages');
	if (fullMessages) {
		return fullMessages.join(', ');
	}
	return CONNECTION_ERR_MESSAGE;
};

/*
	Errors will be an array of string as per devise
 */
const parseErrorResponse = (response) => {
	console.log("Error Response: ", response)
	const error = getNested(response, 'data.error');
	if (error) {
		if(error === "invalid_grant") return "Incorrect Username or Password.";
		return error;
	}
	return CONNECTION_ERR_MESSAGE;
};

export const validateToken = () => {
	const session = selectors.get();
	if (!session || !session.tokens) {
		console.log('No tokens found in session');
		return Promise.reject('No tokens found');
	}
	axios.defaults.headers = session.tokens;

	return isNetworkConnected().then(isConnected => {
		console.log('isConnected',isConnected);
		if(isConnected) {
			return new Promise((resolve, reject) => {
				api.validateToken(session.tokens)
				.then(response => {
						console.log('validateToken response = ', response);
						const userData = onRequestSuccess(response);
						resolve(userData);
					}
				)
				.catch((error) => {
					console.log('validateToken error.response = ', error.response);
					const errorMessage = parseErrorResponse(error.response);
					reject(errorMessage);
				});
			});
		} else {
			return new Promise((resolve, reject) => {
				console.log('Allowing without internet');
				resolve(session.user);
			});
		}
	})
	.catch (err => {
		return new Promise((resolve, reject) => {
			console.log('Couldn,t check connection');
			reject(err);
		})
	});
};

export const authenticate =  (login, password) => {
	return new Promise((resolve, reject) => {
		api.authenticate(login, password)
		.then(response => {
				console.log('SUCCESS: auth response = ', response);
				const accessToken = onRequestSuccess(response);
				axios.defaults.headers['Authorization'] = "Bearer "+ accessToken;
				
				resolve(
					api.getUser(login).then(response => {
						const user = response.data.response;
						store.dispatch({ type: UPDATE, payload: { tokens: accessToken, user: user, isLogin: true } });
						resolve(user);
					}).catch (err => {console.log("Failure in getting user detail after signin")})
				);
		})
		.catch(error => {
			console.log('FAILURE: auth error = ', error);
			const errorMessage = parseErrorResponse(error.response);
			reject(errorMessage);
		});
	});
};

export const register = (signupData) => {
	return new Promise((resolve, reject) => {
		api.register(signupData)
		.then(response => {
			console.log('register response = ', response);
			const userData = onRequestSuccess(response);
			resolve(userData);
		})
		.catch(error => {
			console.log('register error = ', error);
			const errorMessage = parseSignUpErrorResponse(error.response);
			reject(errorMessage);
		});
	});
};

export const signOut = () => {
	return new Promise((resolve, reject) => {
		api.signOut().then((response) => {
			console.log('signOut response = ', response);
			clearSession();
			console.log('signOut response  clear= ', response);

			const successMessage = 'Signed out successfully';
			resolve(successMessage);
		})
		.catch(error => {
			console.log('signOut error.response = ', error.response);
			clearSession();
			const errorMessage = parseErrorResponse(error.response);
			reject(errorMessage);
		});
	});
};
