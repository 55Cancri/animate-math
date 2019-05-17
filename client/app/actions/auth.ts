import React from 'react';
import { Dispatch } from 'redux';
// import api from '../api';
// import { environment } from '../../../environment';

export const getName = (role: string): string => {
  if (role === 'SU') return 'tossu1';
  if (role === 'DU') return 'tosdu2';
  if (role === 'PA') return 'tospa3';
  return '';
};

// login action
export const login = user => ({ type: 'LOGIN', user });

// login action creator (calls login action)
export const startLogin = credentials => async (dispatch: Dispatch) => {
  const { username } = credentials;
  // const { username, role } = credentials;
  // const userData = await api.user.login(credentials)
  const user = {
    role: 'SU',
    username,
    name: 'eric morrison',
    id: 'eachuserwillhaveuniqueid',
    email: `${username}@collegeboard.org`,
    token: 'awstokenwillgohere',
  };

  // set token in localstorage
  localStorage.setItem('cb-token', user.token);

  return dispatch(login(user));
};

export const switchAdmin = admin => ({
  type: 'SWITCH_ADMIN',
  admin,
});

export const startSwitchAdmin = (role: string) => async (dispatch: Dispatch) => {
  const username = getName(role);
  const newAdmin = { role, username };
  return dispatch(switchAdmin(newAdmin));
};

// logout action
export const logout = () => ({ type: 'LOGOUT' });

// logout action creator (calls login action)
export const startLogout = () => (dispatch: Dispatch) => {
  localStorage.clear();
  return dispatch(logout());
};

export const updateRole = (role: string) => ({ type: 'UPDATE-ROLE', role });

// set token in localstorage
export const startUpdateRole = (role: string) => async (dispatch: Dispatch) =>
  dispatch(updateRole(role));

// signup action creator (calls login action)
// export const startSignup = data => async (dispatch: Dispatch): Promise<void> => {
//   const user = await api.user.signup(data);
//   localStorage.setItem('cb-token', user.token);
//   dispatch(login(user));
// };

// export const startRefresh = credentials => async (dispatch: Dispatch): Promise<void> => {
//   const user = await api.user.refresh(credentials);
//   localStorage.setItem('cb-token', user.token);
//   dispatch(login(user));
// };
