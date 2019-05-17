import React from 'react';
import { Dispatch } from 'redux';

export const setErrors = (category, errorArray) => {
  const errorObject = errorArray.reduce(
    (item, [key, message]) => ({
      ...item,
      [key]: message,
    }),
    {},
  );

  // use the existence of errors to determine the button state
  const buttonDisabled = Object.values(errorObject).some(value => value !== '');

  // create error object to be dispatched
  return { type: 'ERROR', category, errorObject, buttonDisabled };
};
