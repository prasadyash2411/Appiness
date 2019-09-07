import {
  LOGIN,
} from './constants/actionTypes';

const promiseMiddleware =  store => next =>  (action) => {
  next(action);
};

const localStorageMiddleware = store => next => (action) => {
  if ( action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('bearer', action.payload.data.token);
      window.localStorage.setItem('username', action.payload.data.username);
    }
  }

  next(action);
};


export { promiseMiddleware, localStorageMiddleware };
