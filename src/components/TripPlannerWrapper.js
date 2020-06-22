import React, { useEffect, useState } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";

import CreateTrip from "./CreateTrip";
import MatchTrips from "./MatchTrips";

const TripPlannerWrapper = ({ planLocation, setPlanLocation }) => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [fullUserInfo, setFullUserInfo] = useState({});

  console.log("plan location", planLocation);

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

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <p>In the TripPlannerWrapper</p>
      <CreateTrip planLocation={planLocation} fullUserInfo={fullUserInfo} />
      <h3>OR join up with your friends on their adventures!</h3>
      <MatchTrips planLocation={planLocation} />
    </>
  );
};

export default TripPlannerWrapper;
