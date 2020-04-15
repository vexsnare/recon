import * as api from './Api';
import _ from 'lodash';
import { workIdMap } from '../../../helpers/consts';


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
  return api.updateProject(projectData, id);
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

export const get = (id) => {
  return new Promise((resolve, reject) => {
    api.fetchProject(id)
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

export const remove = (id) => {
  return api.deleteProject(id);
};

transformProjectData = (projectData) => {
  selected_works = _.pickBy(projectData.works, (value, key) => value);
  works = [];
  for( work in selected_works) {
    works.push(workIdMap[work])
  }
  return {...projectData, works: works};
}
