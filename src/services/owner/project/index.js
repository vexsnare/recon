import * as api from './Api';
import _ from 'lodash';

export const create = (projectData) => {
  return new Promise((resolve, reject) => {
    api.createProject(projectData)
    .then((result) => {
      console.log(result);
      resolve(result.data);
    })
    .catch(err => {
      console.log(err);
      reject(err);
    });
  });
};

export const update = (projectData, id) => {
  const data = {id, ...projectData};
  console.log("$DATA:", data);
  return api.updateProject(data);
};

export const fetch = () => {
  return new Promise((resolve, reject) => {
    api.fetchProjects()
    .then((result) => {
      console.log("result.data", result.data);
      resolve(result.data);
    })
    .catch(err => {
      console.log("err", err);
      reject(err);
    });
  });
};

export const remove = (id) => {
  return api.deleteProject(id);
};
