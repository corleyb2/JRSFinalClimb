import React, { useEffect } from "react";
import axios from "axios";

const MyUpcomingTrips = ({ currentUser }) => {
  let userTripArr = [];
  console.log("userTripArr", userTripArr);

  useEffect(() => {
    async function userTrips() {
      await axios({
        method: "get",
        url: `http://localhost:4000/relationals`,
        header: {
          "Content-Type": "application/json",
        },
      }).then((result) => {
        userTripArr = result.data.filter((trip) => {
          trip.scheduledUsers.map((user) => {
            if (user === currentUser._id) {
              // console.log("this trip includes current user", trip);
              userTripArr.push(trip);
            }
          });
        });
      });
    }
    userTrips();
  }, []);

  return (
    <div>
      <p>{currentUser.firstname}</p>
      {userTripArr &&
        userTripArr.map((trip) => (
          <div key={trip._id}>
            <h3>{trip.location}</h3>
            <p>
              {trip.dateRange.start} to {trip.dateRange.end}
            </p>
          </div>
        ))}
    </div>
  );
};

export default MyUpcomingTrips;
