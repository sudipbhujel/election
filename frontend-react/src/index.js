import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";

// import history from "./history";
import GlobalStyles from "./globalStyles";

const store = configureStore();

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
