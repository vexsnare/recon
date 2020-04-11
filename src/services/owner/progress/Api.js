import axios from 'axios';

const endPoints = {
	projects: '/projects',
};

export const fetchReports = (project_id, date, timezone) => {
  return axios.get(`${endPoints.projects}/${project_id}/reports/lookup?date=${date}&&timezone=${timezone}`);
};

export const fetchInput = (project_id, sincedate, timezone) => {
  return axios.get(`${endPoints.projects}/${project_id}/reports/input?since=${sincedate}&&timezone=${timezone}`);
};

export const fetchOutput = (project_id, sincedate, timezone) => {
  return axios.get(`${endPoints.projects}/${project_id}/reports/output?since=${sincedate}&&timezone=${timezone}`);
};

export const fetchProductivity = (project_id) => {
  return axios.get(`${endPoints.projects}/${project_id}/productivity`);
};

export const fetchSummary = (project_id) => {
  return axios.get(`${endPoints.projects}/${project_id}/productivity/summary`);
};
