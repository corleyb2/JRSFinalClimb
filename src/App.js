import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Router } from "@reach/router";

import CreateUserProfileContainer from "./containers/CreateUserProfileContainer";
import CreateClimbContainer from "./containers/CreateClimbContainer";
import Home from "./components/Home";
import Nav from "./components/Nav";
import ClimbList from "./components/ClimbList";
import ClimbPage from "./components/ClimbPage";
import CreateClimb from "./components/CreateClimb";
import PlanTrip from "./components/PlanTrip";
import EditUserProfile from "./components/EditUserProfile";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <Nav />
      <Router>
        <Home path="/" />
        <UserProfile path="/user" />
        <CreateUserProfileContainer path="/create_user" />
        <EditUserProfile path="/edit_user" />
        <ClimbList path="/climbs" />
        <CreateClimbContainer path="/create_climb" />
        {/* <ClimbPage path=":invoiceId" /> */}
        <PlanTrip path="/plan_trip" />
      </Router>
    </div>
  );
}

export default App;
