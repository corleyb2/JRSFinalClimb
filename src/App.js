import React, { useState } from "react";
import "./App.css";
import { Router } from "@reach/router";
import { withAuthenticator, AmplifyAuthenticator } from "@aws-amplify/ui-react";

import Home from "./components/Home";
import Nav from "./components/Nav";
import ClimbList from "./components/ClimbList";
import ClimbPage from "./components/ClimbPage";
import CreateClimb from "./components/CreateClimb";
import CreateTrip from "./components/CreateTrip";
import EditUserProfile from "./components/EditUserProfile";
import UserProfile from "./components/UserProfile";
import CreateUserProfile from "./components/CreateUserProfile";
import TripPlannerWrapper from "./components/TripPlannerWrapper";

function App() {
  const [planLocation, setPlanLocation] = useState({});

  return (
    <div className="App">
      <Nav />
      <AmplifyAuthenticator>
        <Router>
          <Home path="/" />
          <UserProfile path="/user" />
          <CreateUserProfile path="/create_user" />
          <EditUserProfile path="/edit_user" />
          <ClimbList
            path="/climbs"
            planLocation={planLocation}
            setPlanLocation={setPlanLocation}
          />
          <ClimbPage path="/climbs/:climbId" />
          <CreateClimb path="/create_climb" />
          <TripPlannerWrapper path="/plan_trip" planLocation={planLocation} />
        </Router>
      </AmplifyAuthenticator>
    </div>
  );
}

export default withAuthenticator(App);
