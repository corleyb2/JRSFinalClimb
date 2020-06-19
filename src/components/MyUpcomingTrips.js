import React, { useEffect } from "react";
import axios from "axios";

const MyUpcomingTrips = ({ currentUser }) => {
  //axios query to Trips
  //map through attendees of each
  //find those where attendees array includes current user

  useEffect(() => {
    async function matchTrips() {
      await axios({
        method: "get",
        url: `http://localhost:4000/trips`,
        header: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log("response.data on upcomingtrips", response.data);
      });
    }
    matchTrips();
  }, []);

  return (
    <div>
      <p>Trip 1</p>
      <p>Trip 2</p>
    </div>
  );
};

export default MyUpcomingTrips;
