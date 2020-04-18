import axios from 'axios';

const endPoints = {
	project: '/record/',
	bulk: '/record/bulk',
};

export const fetchProject = (id) => {
	return axios.get(`${endPoints.projects}/${id}`);
};

//In Use
export const createProject = (projectData) => {
	console.log(projectData);
	return axios.post(endPoints.project, projectData);
};

//In Use
export const submitPending = (records) => {
	return axios.post(endPoints.bulk, records);
};

//In Use
export const updateProject = (data) => {
	return axios.put(endPoints.project, data);
};

export const deleteProject = (id) => {
	return axios.delete(`${endPoints.projects}/${id}`);
};
