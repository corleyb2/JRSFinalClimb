import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import Home from "./components/Home";
import Nav from "./components/Nav";
import ClimbList from "./components/ClimbList";
import ClimbPage from "./components/ClimbPage";
import CreateClimb from "./components/CreateClimb";
import CreateTrip from "./components/CreateTrip";
import EditUserProfile from "./components/EditUserProfile";
import UserProfile from "./components/UserProfile";
import CreateUserProfile from "./components/CreateUserProfile";

function App() {
  return (
    <div className="App">
      <Nav />
      <Router>
        <Home path="/" />
        <UserProfile path="/user" />
        <CreateUserProfile path="/create_user" />
        <EditUserProfile path="/edit_user" />
        <ClimbList path="/climbs" />
        <ClimbPage path="/climbs/:climbId" />
        <CreateClimb path="/create_climb" />
        <CreateTrip path="/plan_trip" />
      </Router>
    </div>
  );
}

export default withAuthenticator(App);
