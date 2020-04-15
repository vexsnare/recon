import axios from 'axios';

const endPoints = {
	records: '/record/all',
};

export const getAllRecords = () => {
  	return axios.get(endPoints.records);
};
