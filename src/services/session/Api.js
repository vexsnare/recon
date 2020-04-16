import axios from 'axios';

const endPoints = {
	validateToken: '/auth/validate_token',
	signOut: 'auth/sign_out',
	register: '/user/signup',
	userUpdate: '/user',
};

export const authenticate = (username, password) => {
	axios.defaults.headers['Authorization'] = 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA=';
	console.log("axios.defaults", axios.defaults);
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
	return true;
};

export const register = (signupData) => {
	return axios.post(endPoints.register, signupData);
};

export const update = (signupData) => {
	return axios.put(endPoints.userUpdate, signupData);
};