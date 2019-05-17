import React from 'react';

export const setApiErrors = (apiErrors: boolean) => dispatch =>
  dispatch({ type: 'API_ERRORS', apiErrors });
