import {
  DECIMAL_REGEX,
  INTEGER_REGEX
} from './regex';

export const required = (value) => {
  if (typeof value === 'number') return undefined;
  if (!value || !value.trim()) {
      return `Field is required`;
  }
  return undefined;
}
 export const email = (value) => {
   var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(value && !regex.test(value)) return 'Enter a valid Email address';
    return undefined;
 }
export const mobile = (value) => {
  if(value && !/^[1-9]{1}\d{9}$/i.test(value))
    return'Enter a valid mobile number';
  return undefined;
}

export const decimal = (value) => {
  if(value && !DECIMAL_REGEX.test(value))
    return'Enter a valid decimal number';
  return undefined;
}

export const integer = (value) => {
  if(value && !INTEGER_REGEX.test(value))
    return'Enter a valid Integer';
  return undefined;
}

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
  
export const maxLength2 = maxLength(3)