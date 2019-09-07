import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './components/reducer';
import common from './common/reducers';


export const appReducer = history => combineReducers({
  auth,
  common,
  router: connectRouter(history),
});

export const rootReducer = history => (state, action) => {
  if (action.type === 'LOGOUT') {
    const { router, common } = state;
    state = { router, common };
  }
  return appReducer(history)(state, action);
};
