import React, { useEffect, useState } from "react";
import axios from "axios";

import ExistingTripList from "./ExistingTripList";

const MatchTrips = ({ planLocation }) => {
  const [listUpcomingTrips, setListUpcomingTrips] = useState([]);
  const [renderList, setRenderList] = useState(false);
  console.log("list upcoming trips by hook", listUpcomingTrips);

  useEffect(() => {
    async function fetchTripsMatchingLocation() {
      try {
        const response = await axios({
          method: "GET",
          url: `http://localhost:4000/trip?name=${planLocation.name}`,
          header: {
            ContentType: "application/json",
          },
        });
        setListUpcomingTrips(response.data);
        setRenderList(true);
      } catch (error) {
        console.log("Error Fetching Matches", error);
      }
    }
    fetchTripsMatchingLocation();
  }, []);

  return (
    <>
      {renderList ? (
        <div styles={style.tripGrid}>
          <ExistingTripList listUpcomingTrips={listUpcomingTrips} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MatchTrips;

const style = {
  tripGrid: {
    width: "80vw",
  },
};
