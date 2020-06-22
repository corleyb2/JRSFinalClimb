import React from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

Amplify.configure(awsconfig);

const styles = {
  universal: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10vw",
    marginRight: "10vw",
    marginTop: "70px",
    justifyContent: "center",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <App style={styles.universal} />
  </React.StrictMode>,
  document.getElementById("root")
);
