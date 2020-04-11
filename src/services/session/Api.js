import axios from 'axios';

const endPoints = {
	authenticate: 'auth/sign_in',
	validateToken: '/auth/validate_token',
	signOut: 'auth/sign_out',
	register: '/auth',
};

export const authenticate = (loginData) => {
  return axios.post(endPoints.authenticate, loginData);
};

export const validateToken = () => {
	return axios.get(endPoints.validateToken);
};

export const signOut = () => {
	return axios.delete(endPoints.signOut);
};

export const register = (signupData) => {
	return axios.post(endPoints.register, signupData);
};
