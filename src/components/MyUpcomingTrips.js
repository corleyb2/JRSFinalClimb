import React, { useEffect } from "react";
import axios from "axios";

const MyUpcomingTrips = () => {
  //axios query to Trips - response.data.map((trip) => )

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
      }).then(
        (result) => {
          console.log(result.data);
        }
        // let attendeesArray = tripsArray.map((trip) => trip.attendees);
        // console.log("attendees array", attendeesArray);
        // let myTrips = attendeesArray.map((myTrip) => {
        //   myTrip.map((myName) => {
        //       if (myName === currentUser.name)
        //   })
        // });
      );
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
