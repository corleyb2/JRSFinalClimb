import React from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
