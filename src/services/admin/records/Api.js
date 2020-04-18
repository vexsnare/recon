import axios from 'axios';
import { getUser } from '../../../services/session/Selectors';

const endPoints = {
	records: '/record/all'
};

export const getAllRecords = () => {
	const user = getUser();
	let endPoint = '/record/partner';
	if(user.roles.length > 1) {
		endPoint = endPoints.records;
	}
  	return axios.get(endPoint);
};
