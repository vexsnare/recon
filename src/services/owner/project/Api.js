import axios from 'axios';

const endPoints = {
	projects: '/record/',
	reports: '/reports',
};

export const fetchProjects = () => {
  return axios.get(endPoints.projects);
};

export const fetchProject = (id) => {
	return axios.get(`${endPoints.projects}/${id}`);
};

export const createProject = (projectData) => {
	return axios.post(endPoints.projects, projectData);
};

export const updateProject = (projectData, id) => {
	return axios.put(`${endPoints.projects}/${id}`, projectData);
};

export const deleteProject = (id) => {
	return axios.delete(`${endPoints.projects}/${id}`);
};
