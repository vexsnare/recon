import axios from 'axios';

const endPoints = {
	validateToken: '/auth/validate_token',
	signOut: 'auth/sign_out',
	register: '/user/signup',
	userUpdate: '/user/',
	myAdmin: '/user/myadmin'
};

//In Use
export const authenticate = (username, password) => {
	axios.defaults.headers['Authorization'] = 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA=';
	console.log("axios.defaults", axios.defaults);
    const url = `/oauth/token?username=${username}&password=${password}&grant_type=password`;
	return axios.post(url, {}, {});
};

// In Use
export const getUser = (username) => {
    const url = `/user/?mobileNumber=${username}`;
	return axios.get(url);
};

// In Use
export const getMyAdmin = (username) => {
	
	const url = `${endPoints.myAdmin}?mobileNumber=${username}`;
	
	return axios.get(url);
};

export const validateToken = () => {
	return axios.get(endPoints.validateToken);
};

export const signOut = () => {
	return true;
};

//In use
export const register = (signupData) => {
	return axios.post(endPoints.register, signupData);
};

//In use
export const updateAccount = (updateAccountData) => {
	return axios.put(endPoints.userUpdate, updateAccountData);
};