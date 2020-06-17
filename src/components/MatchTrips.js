import React, { useEffect, useState } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";

const MatchTrips = ({ tripFocus, planLocation }) => {
  async function fetchTripsMatchingLocation() {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:4000/trips`,
        header: {
          ContentType: "application/json",
        },
      });
      let arr = response.data;
      let upcomingTrips = [];
      arr.filter((previouslyPlanned) => {
        if (previouslyPlanned.location === planLocation.name) {
          upcomingTrips.push(previouslyPlanned);
          console.log("upcoming trips array", upcomingTrips);
        }
      });
    } catch (error) {
      console.log("Error Fetching Matches", error);
    }
  }

  return (
    <>
      <button onClick={() => fetchTripsMatchingLocation()}>
        Get Upcoming Trips
      </button>
    </>
  );
};

export default MatchTrips;
