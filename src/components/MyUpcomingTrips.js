import React, { useEffect, useState } from "react";
import axios from "axios";

const MyUpcomingTrips = ({ currentUser }) => {
  const [userTrips, setUserTrips] = useState([]);

  console.log("biff", userTrips);

  useEffect(() => {
    async function userTrips() {
      const retrievedTrips = await axios({
        method: "get",
        url: `http://localhost:4000/relational?scheduledUser=${currentUser._id}`,
        header: {
          "Content-Type": "application/json",
        },
      });
      console.log("retrieved trips", retrievedTrips.data);
      await setUserTrips(retrievedTrips.data);
    }
    userTrips();
  }, []);

  return (
    <div>
      {userTrips &&
        userTrips.map((trip) => (
          <div key={trip._id}>
            <h3>{trip.scheduledTrip.location}</h3>
            <p>
              {trip.scheduledTrip.dateRange.start} to{" "}
              {trip.scheduledTrip.dateRange.end}
            </p>
          </div>
        ))}
    </div>
  );
};

export default MyUpcomingTrips;
