import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import { createLogger } from "redux-logger";
import _ from "lodash";

import app, {
  authSaga,
  candidateSaga,
  partiesSaga,
  profileSaga,
  voteSaga,
} from "./index";

import { loadState, saveState } from "../services/localStorage";

const persistedState = loadState();

// create and configure reduxer middleware ( saga is a middleware )
const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const store = createStore(
    app,
    persistedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.subscribe(
    _.throttle(() => {
      saveState({
        auth: store.getState().auth,
      });
    }, 1000)
  );
  sagaMiddleware.run(authSaga);
  sagaMiddleware.run(candidateSaga);
  sagaMiddleware.run(profileSaga);
  sagaMiddleware.run(partiesSaga);
  sagaMiddleware.run(voteSaga);

  store.close = () => store.dispatch(END);
  return store;
};

export default configureStore;
