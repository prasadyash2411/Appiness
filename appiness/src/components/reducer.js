import {
    LOGIN,
    ASYNC_START,
  } from '../constants/actionTypes';

  const INITIAL_STATE = {
    inProgress: false,
    errors: false,
    message : ''
  }
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          inProgress: false,
          errors: action.payload.userExists,
          userExists: action.payload.data.userExists,
          message: action.payload.data.message
        };
      case ASYNC_START:
        if (action.subtype === LOGIN ) {
          return { ...state, inProgress: true };
        }
        break;
      default:
        return state;
    }
  
    return state;
  };
  