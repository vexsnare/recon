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
import { REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, REGISTER_USER } from './../../actions/register/types'
import { LOGOUT_USER_SUCCESS } from '../../actions/logout/types';

const onRequestSuccess = (response) => {
	const access_token = response.data.access_token;
	return access_token;
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
	console.log(signupData);
	return new Promise((resolve, reject) => {
		api.register(signupData)
		.then(response => {
			console.log('register response = ', response);
			const status = response.data.status;
			if(status == "FAILURE") {
				throw response.data.exception.message;
			} else {
				store.dispatch({ type: REGISTER_USER_SUCCESS});
			}
			resolve(status);
		})
		.catch(error => {
			console.log('register error = ', error);
			reject(error);
		});
	});
};

export const findMyAdmin = (username) => {
	console.log("Forgot find for username ", username);
	return new Promise((resolve, reject)=> {
		api.getMyAdmin(username)
		.then(response => {
			console.log("resposen for foo");
			resolve(response.data);
		}).catch(error => {
			console.log("error", error);
			reject(error);
		})
	});
}

export const update = (signupData) => {
	console.log(signupData);
	return new Promise((resolve, reject) => {
		api.update(signupData)
		.then(response => {
			console.log('register response = ', response);
			const status = response.data.status;
			if(status == "FAILURE") {
				throw response.data.exception.message;
			} else {
				store.dispatch({ type: REGISTER_USER_SUCCESS});
			}
			resolve(status);
		})
		.catch(error => {
			console.log('register error = ', error);
			reject(error);
		});
	});
};