import React, { useEffect, useState } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";

//thinking popover?

const CreateTrip = ({ planLocation }) => {
  const [currentUser, setCurrentUser] = useState("");
  console.log("climb from CreateTrip", planLocation);

  useEffect(() => {
    async function getUserProfile() {
      const useAuth = await Auth.currentUserInfo();
      const gotUser = await useAuth.username;
      setCurrentUser(gotUser);
    }
    getUserProfile();
  }, []);

  let endDateInput, startDateInput;
  let attendees = [];

  async function submitCreatedTrip() {
    try {
      let tripToCreate = {
        location: "TestLocation",
        dateRange: {
          start: startDateInput.value,
          end: endDateInput.value,
        },
        attendees: attendees.push(currentUser),
      };
      console.log("TripToCreate", tripToCreate);
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/trip",
        data: tripToCreate,
        header: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log("response", response);
      });
    } catch (error) {
      console.error("cannot create trip", error);
    }
  }

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          submitCreatedTrip();
        }}
      >
        <h2>Trip Planning</h2>
        <label htmlFor="climbName"></label>
        <p> Location hard coded for testing</p>
        <label htmlFor="startDate">End Date</label>
        <input
          type="date"
          id="startDate"
          ref={(node) => (startDateInput = node)}
        />
        <label htmlFor="endDate">End Date</label>
        <input type="date" id="endDate" ref={(node) => (endDateInput = node)} />
        <button type="submit">Plan</button>
      </form>
    </>
  );
};

export default CreateTrip;
