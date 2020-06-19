import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateTrip = ({ planLocation, currentUsername, fullUserInfo }) => {
  const [createdTrip, setCreatedTrip] = useState({});

  console.log("FullUserInfo at createtrip", fullUserInfo);

  let endDateInput, startDateInput;
  let attendees = [];

  async function submitCreatedTrip() {
    try {
      let tripToCreate = {
        location: planLocation.name,
        dateRange: {
          start: startDateInput.value,
          end: endDateInput.value,
        },
        attendees: attendees.concat(fullUserInfo._id),
      };
      console.log("TripToCreate", tripToCreate);
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/trip",
        data: tripToCreate,
        header: {
          "Content-Type": "application/json",
        },
      }).then((result) => setCreatedTrip(result.data));
    } catch (error) {
      console.error("cannot create trip", error);
    }
  }

  // async function addToUserTrips() {
  //   try {
  //     let tripToUser = createdTrip._id;
  //     let myTrips = [];
  //     console.log("tripToUser", tripToUser);
  //     const response = await axios({
  //       method: "PUT",
  //       url: `http://localhost:4000/user?username=${currentUsername}`,
  //       data: {
  //         myTrips: myTrips.concat(tripToUser._id),
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then((response) => console.log("trip added ToUser", response.data));
  //   } catch (error) {
  //     console.log("Can't add to user Trips");
  //   }
  // }

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await submitCreatedTrip();
        }}
      >
        <h2>Trip Planning</h2>
        <label htmlFor="climbName"></label>
        <p> Planning Trip to {planLocation.name}</p>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          ref={(node) => (startDateInput = node)}
        />
        <label htmlFor="endDate">End Date</label>
        <input type="date" id="endDate" ref={(node) => (endDateInput = node)} />
        <button type="submit">Submit Trip</button>
      </form>
    </>
  );
};

export default CreateTrip;
