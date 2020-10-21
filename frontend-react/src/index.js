import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import app, {
  authSaga,
  candidateSaga,
  partiesSaga,
  profileSaga,
} from "./store";

// import history from "./history";
import GlobalStyles from "./globalStyles";

// create and configure reduxer middleware ( saga is a middleware )
const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [sagaMiddleware, loggerMiddleware]

const store = createStore(
  app,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(candidateSaga);
sagaMiddleware.run(authSaga);
sagaMiddleware.run(profileSaga);
sagaMiddleware.run(partiesSaga);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <GlobalStyles />
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
