import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import { appReducer, rootReducer } from './reducer';
import { createBrowserHistory } from 'history'

const persistConfig = {
  key: 'root',
  storage,
};

export const history = createBrowserHistory()

const persistedReducer = persistReducer(persistConfig, rootReducer(history));


// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(
      myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware,
    );
  }
  // Enable additional logging in non-production environments.
  return applyMiddleware(
    myRouterMiddleware,
    promiseMiddleware,
    localStorageMiddleware,
    createLogger(),
  );
};


export const store = createStore(
  persistedReducer, composeWithDevTools(getMiddleware()),
);

export const persistor = persistStore(store);
