import axios from 'axios';

const endPoints = {
	device_registrations: '/device_registrations',
	notifications: '/notifications'
};

export const sendResigrationId = (requestObj) => {
	return axios.post(endPoints.device_registrations, requestObj);
};

export const getNotifications = () => {
	return axios.get(endPoints.notifications);

}
