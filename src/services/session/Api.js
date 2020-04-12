import axios from 'axios';

const endPoints = {
	validateToken: '/auth/validate_token',
	signOut: 'auth/sign_out',
	register: '/auth',
};

export const authenticate = (username, password) => {
    const url = `/oauth/token?username=${username}&password=${password}&grant_type=password`;
	return axios.post(url, {}, {});
};

export const getUser = (username) => {
    const url = `/user/?mobileNumber=${username}`;
	return axios.get(url);
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
