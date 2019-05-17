/* eslint-disable import/prefer-default-export, fp/no-nil */
import React from 'react';

const initialModalState = {
  modalType: null,
};

export const modalReducer = (state = initialModalState, action = {} as any) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { modalType: action.modalType };

    case 'HIDE_MODAL':
      return { modalType: null };

    default:
      return state;
  }
};
