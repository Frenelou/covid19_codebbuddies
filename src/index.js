import React from "react";
import ReactDOM from "react-dom";
import Header from "./Components/Header";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.Fragment>
    <Header />
    <App />
  </React.Fragment>,
  rootElement
);
