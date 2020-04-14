import axios from 'axios';

const endPoints = {
	records: '/record/all',
};

export const getAllRecords = () => {
	console.log(axios.defaults.headers);
  	return axios.get(endPoints.records);
};
