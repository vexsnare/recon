import axios from 'axios';

const endPoints = {
	tasks: '/tasks',
};

export const fetchTasks = () => {
  return axios.get(endPoints.tasks);
};
