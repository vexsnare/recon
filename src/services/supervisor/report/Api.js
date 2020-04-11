import axios from 'axios';

const endPoints = {
	reports: '/reports',
};

export const submitReport = (data) => {
	console.log("report data sending to server = ", data);
  return axios.post(endPoints.reports, data);
};
