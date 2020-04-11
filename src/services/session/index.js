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

const onRequestSuccess = (response) => {
	const tokens = _.pick(response.headers, ['access-token', 'uid', 'client']);
	const userData = response.data.data;
	store.dispatch({ type: UPDATE, payload: { tokens, user: userData } });
	axios.defaults.headers = tokens;
	return userData;
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
	const errors = getNested(response, 'data.errors');
	if (errors) {
		return errors.join(', ');
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

export const authenticate = (login, password) => {
	var loginData;
	if(login.indexOf('@') !== -1) {
		loginData = {
		 	email: login,
		 	password
		};
	 } else {
		 loginData = {
			 contact_number: login,
			 password
		 };
	}
	return new Promise((resolve, reject) => {
		api.authenticate(loginData)
		.then(response => {
				console.log('SUCCESS: auth response = ', response);
				const userData = onRequestSuccess(response);
				resolve(userData);
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
