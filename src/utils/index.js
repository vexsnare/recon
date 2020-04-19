import moment from 'moment';

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getNested = (obj, key) => {
    return key.split(".").reduce((o, x) => {
        return (typeof o === "undefined" || o === null) ? o : o[x];
    }, obj);
};

export const getCurrentDate = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  }
  if(mm<10){
      mm='0'+mm;
  }
  var today = dd+'-'+mm+'-'+yyyy;
  return today;
}

export const getThisWeekDate = () => {
  var date = new Date();
  var dd = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
  var mm=date.getMonth()+1;
  var yyyy=date.getFullYear();
  if(dd<10){
      dd='0'+dd;
  }
  if(mm<10){
      mm='0'+mm;
  }
  var weekdate = dd+'-'+mm+'-'+yyyy;
  return weekdate;
}

export const getThisMonthDate = () => {
  var date = new Date();
  var dd = 1;
  var mm=date.getMonth()+1;
  var yyyy=date.getFullYear();
  if(dd<10){
      dd='0'+dd;
  }
  if(mm<10){
      mm='0'+mm;
  }
  var monthDate = dd+'-'+mm+'-'+yyyy;
  return monthDate;
}

export const getTillNowDate = () => {
  var tillDate = '01-01-2000';
  return tillDate;
}


export const formatDate = (timestamp, formatString) => {
  const timeString = moment(timestamp).format( formatString );
  return timeString;
}