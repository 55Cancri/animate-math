/* eslint-disable import/prefer-default-export, fp/no-nil, sonarjs/no-small-switch */
import React from 'react';

const initialState = {
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
  },
  invoice: {
    PONumber: '',
  },
};

const updateErrors = (state, category, errorObject) => {
  // extract the po number and the remaining contact errors
  // po number will be a string and contact errors will be an object
  const { PONumber = '', ...contactErrors } = errorObject;

  return {
    ...state,
    [category]: contactErrors,
    invoice: {
      ...state.invoice,
      PONumber,
    },
  };
};

export const errorsReducer = (state = initialState, action = {} as any) => {
  const { category, errorObject } = action;
  switch (action.type) {
    // replace the error object in the store with the new error
    case 'ERROR':
      // this error object will be read directly from the contact component
      return updateErrors(state, category, errorObject);

    default:
      return state;
  }
};
