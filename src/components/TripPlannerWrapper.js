import React, { useEffect, useState } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";

import CreateTrip from "./CreateTrip";
import MatchTrips from "./MatchTrips";

const TripPlannerWrapper = ({ planLocation, setPlanLocation }) => {
  const [tripFocus, setTripFocus] = useState({});
  const [currentUsername, setCurrentUsername] = useState("");
  const [fullUserInfo, setFullUserInfo] = useState({});

  useEffect(() => {
    async function getUserProfile() {
      const useAuth = await Auth.currentUserInfo();
      const gotUser = await useAuth.username;
      await setCurrentUsername(gotUser);
      await getAllUserData(gotUser);
    }
    getUserProfile();
  }, []);

  async function getAllUserData(arg) {
    try {
      await axios({
        method: "GET",
        url: `http://localhost:4000/user?username=${arg}`,
        header: {
          "Content-Type": "application/json",
        },
      }).then((result) => setFullUserInfo(result.data));
    } catch (error) {
      console.error("User Get Failed", error);
    }
  }

  console.log(currentUsername);
  console.log(fullUserInfo);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <p>In the TripPlannerWrapper</p>
      <MatchTrips planLocation={planLocation} tripFocus={tripFocus} />
      <CreateTrip planLocation={planLocation} fullUserInfo={fullUserInfo} />
    </>
  );
};

export default TripPlannerWrapper;
