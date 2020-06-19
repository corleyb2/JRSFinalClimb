import React, { useEffect, useState } from "react";
import axios from "axios";

import ExistingTripList from "./ExistingTripList";

const MatchTrips = ({ tripFocus, planLocation }) => {
  const [listUpcomingTrips, setListUpcomingTrips] = useState([]);
  const [renderList, setRenderList] = useState(false);
  console.log("list upcoming trips by hook", listUpcomingTrips);

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
          listUpcomingTrips.push(previouslyPlanned);
        }
        console.log("setListUpcoming", listUpcomingTrips);
      });
    } catch (error) {
      console.log("Error Fetching Matches", error);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          fetchTripsMatchingLocation();
          setRenderList(!renderList);
        }}
      >
        Get Upcoming Trips
      </button>
      <>
        {renderList ? (
          <div styles={style.tripGrid}>
            <ExistingTripList listUpcomingTrips={listUpcomingTrips} />
          </div>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default MatchTrips;

const style = {
  tripGrid: {
    width: "80vw",
  },
};
