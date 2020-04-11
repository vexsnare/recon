import * as api from './Api';
import _ from 'lodash';

export const fetchReport = (project_id, date) => {
  return new Promise((resolve, reject) => {
    api.fetchReports(project_id, date, "Mumbai")
    .then((result) => {
      var reports = result.data;
      console.log('reports',reports);
      if(reports.length > 1) {
        resolve(reports[reports.length-1])
      }
      else if(reports.length == 1){
        resolve(reports[0]);
      } else {
        resolve(undefined);
      }
    })
    .catch(err => {
      reject(err);
    });
  });
};

export const fetchInput = (project_id, sincedate) => {
  return new Promise((resolve, reject) => {
    api.fetchInput(project_id, sincedate, "Mumbai")
    .then((result) => {
      resolve(result.data);
      console.log('result.data = ',result.data);
    })
    .catch(err => {
      reject(err);
    });
  });
};


export const fetchOutput = (project_id, sincedate) => {
  return new Promise((resolve, reject) => {
    api.fetchOutput(project_id, sincedate, "Mumbai")
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => {
      reject(err);
    });
  });
};


export const fetchProductivity = (project_id) => {
  return new Promise((resolve, reject) => {
    api.fetchProductivity(project_id)
    .then((result) => {
        resolve(result.data);
    })
    .catch(err => {
      reject(err);
    });
  });
};

export const fetchSummary = (project_id) => {
  return new Promise((resolve, reject) => {
    api.fetchSummary(project_id)
    .then((result) => {
        resolve(result.data);
    })
    .catch(err => {
      reject(err);
    });
  });
};
