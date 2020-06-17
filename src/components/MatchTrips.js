import React, { useEffect, useState } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";

const MatchTrips = ({ tripFocus, planLocation }) => {
  console.log("trip focus on MatchTrips", tripFocus);
  console.log("tripFocus.location", tripFocus.location);

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

  //   function matchingTrips(arr) {
  //     for (let i = 0; i < arr.length; i++) {
  //       if (arr[i].location === arr[i + 1].location) {
  //         if (arr[i].dateRange.start === arr[i + 1].dateRange.start) {
  //           if (arr[i].dateRange.end === arr[i + 1].dateRange.end) {
  //             console.log(arr[i] + "end matches" + arr[i + 1]);
  //           }
  //           console.log(arr[i] + "start matches" + arr[i + 1]);
  //         }
  //         console.log(arr[i] + "location matches" + arr[i + 1]);
  //       }
  //       return arr[i] + "matches" + arr[i + 1];
  //     }
  //   }

  return (
    <>
      <button onClick={() => fetchTripsMatchingLocation()}>
        Get Upcoming Trips
      </button>
    </>
  );
};

export default MatchTrips;
