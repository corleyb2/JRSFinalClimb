import React, { useEffect, useState } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";

import CreateTrip from "./CreateTrip";
import MatchTrips from "./MatchTrips";

const TripPlannerWrapper = ({ planLocation, setPlanLocation }) => {
  const [tripFocus, setTripFocus] = useState({});

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <p>In the TripPlannerWrapper</p>
      <MatchTrips planLocation={planLocation} tripFocus={tripFocus} />
      <CreateTrip
        planLocation={planLocation}
        setPlanLocation={setPlanLocation}
        tripFocus={tripFocus}
        setTripFocus={setTripFocus}
      />
    </>
  );
};

export default TripPlannerWrapper;
