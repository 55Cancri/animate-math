/* eslint-disable import/prefer-default-export, fp/no-nil, sonarjs/no-small-switch */
import React from 'react';

const initialState = { apiErrors: false };

export const appReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'API_ERRORS':
      return { ...state, apiErrors: action.apiErrors };

    default:
      return state;
  }
};
