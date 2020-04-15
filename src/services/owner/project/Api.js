import axios from 'axios';

const endPoints = {
	projects: '/record/',
	bulk: '/record/bulk',
};

//In Use
export const fetchProjects = () => {
  return axios.get(endPoints.projects);
};

export const fetchProject = (id) => {
	return axios.get(`${endPoints.projects}/${id}`);
};

//In Use
export const createProject = (projectData) => {

	return axios.post(endPoints.projects, projectData);
};

//In Use
export const submitPending = (records) => {
	console.log("Last " , records);
	return axios.post(endPoints.bulk, records);
};

export const updateProject = (projectData, id) => {
	return axios.put(`${endPoints.projects}/${id}`, projectData);
};

export const deleteProject = (id) => {
	return axios.delete(`${endPoints.projects}/${id}`);
};
