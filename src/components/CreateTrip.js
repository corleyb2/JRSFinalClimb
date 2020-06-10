import React, { useState } from "react";

//thinking popover?

const CreateTrip = ({ boundCreateTrip }) => {
  //local state of current climb pulled down from ClimbPage component
  //where to pull the current user from? Auth?

  let endDateInput, startDateInput;
  let attendees = [];

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          boundCreateTrip &&
            (await boundCreateTrip({
              location: "TestLocation",
              dateRange: {
                start: startDateInput.value,
                end: endDateInput.value,
              },
              attendees: ["Hard-Coded User"],
              // attendees: attendees.push("hard-coded user"),
            }));
        }}
      >
        <h2>Trip Planning</h2>
        <label htmlFor="climbName">Mountain</label>
        <p> Hard coded for testing</p>
        <label htmlFor="startDate">End Date</label>
        <input
          type="date"
          id="startDate"
          ref={(node) => (startDateInput = node)}
        />
        <label htmlFor="endDate">End Date</label>
        <input type="date" id="endDate" ref={(node) => (endDateInput = node)} />
        <label htmlFor="loggedInUser">Logged in User</label>
        <p> Hard coded for testing</p>

        <button type="submit">Plan</button>
      </form>
    </>
  );
};

export default CreateTrip;
