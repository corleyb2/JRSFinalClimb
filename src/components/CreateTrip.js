import React from "react";
import axios from "axios";

//thinking popover?

const CreateTrip = () => {
  //local state of current climb pulled down from ClimbPage component
  //where to pull the current user from? Auth?

  let endDateInput, startDateInput;
  let attendees = [];

  async function submitCreatedTrip() {
    try {
      let tripToCreate = {
        location: "TestLocation",
        //hard coded, will need to be
        dateRange: {
          start: startDateInput.value,
          end: endDateInput.value,
        },
        attendees: ["Hard-Coded User"],
        // attendees: attendees.push("hard-coded user"),
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
        <label htmlFor="climbName">Mountain</label>
        <p> Location hard coded for testing</p>
        <label htmlFor="startDate">End Date</label>
        <input
          type="date"
          id="startDate"
          ref={(node) => (startDateInput = node)}
        />
        <label htmlFor="endDate">End Date</label>
        <input type="date" id="endDate" ref={(node) => (endDateInput = node)} />
        <label htmlFor="loggedInUser">Logged in User</label>
        <p> Attendees hard coded for testing</p>

        <button type="submit">Plan</button>
      </form>
    </>
  );
};

export default CreateTrip;
