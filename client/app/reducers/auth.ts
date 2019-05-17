import React from 'react';

// login user obj will be placed in auth because of auth reducer
// eslint-disable-next-line fp/no-nil
export const authReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        id: action.user.id,
        name: action.user.name,
        email: action.user.email,
        username: action.user.username,
        token: action.user.token,
        role: action.user.role,
      };

    case 'PERSIST':
      return {
        email: action.identity.email,
        token: action.identity.token,
        uid: action.identity.uid,
      };

    case 'SWITCH_ADMIN':
      return {
        ...state,
        role: action.admin.role,
        username: action.admin.username,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        email: action.user.email,
        name: action.user.firstname,
        last: action.user.lastname,
        profileImage: action.user.url,
      };

    case 'UPDATE-ROLE':
      return {
        ...state,
        role: action.role,
      };

    case 'LOGOUT':
      return {};

    default:
      return state;
  }
};

export default authReducer;
