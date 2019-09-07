import {
  APP_LOAD,
  REDIRECT,
  LOGIN,
 
} from '../constants/actionTypes';

export const defaultState = {
  appName: 'APPINESS',
  token: null,
  viewChangeCounter: 0,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
      };
    case REDIRECT:
      return { ...state, redirectTo: action.payload };
    case LOGIN:
      return {
        ...state,
        redirectTo: action.payload.error ? '/login' : '/',
        token: action.payload.error ? null : action.payload.token,
        currentUser: action.payload.error ? null : action.payload.data.name,
        userExists: action.payload.data.userExists,
        message: action.payload.data.message
      };
    default:
      return state;
  }
};