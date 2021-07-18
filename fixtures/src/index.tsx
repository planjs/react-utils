import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import counterStore from "./counterStore";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider {...{ counterStore }}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
