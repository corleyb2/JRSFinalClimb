import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateTrip = ({ planLocation, fullUserInfo }) => {
  const [createdTrip, setCreatedTrip] = useState({});

  console.log("FullUserInfo at createtrip", fullUserInfo._id);
  console.log("createdTrip", createdTrip._id);

  let endDateInput, startDateInput;
  let attendees = [];
  let scheduledUsers = [];

  async function submitCreatedTrip() {
    try {
      let tripCreationPayload = {
        location: planLocation.name,
        dateRange: {
          start: startDateInput.value,
          end: endDateInput.value,
        },
        attendees: attendees.concat(fullUserInfo._id),
      };
      await axios({
        method: "POST",
        url: "http://localhost:4000/trip",
        data: tripCreationPayload,
        header: {
          "Content-Type": "application/json",
        },
      }).then((result) => setCreatedTrip(result.data));
    } catch (error) {
      console.error("cannot create trip", error);
    }
  }

  // let tripCreationPayload = {
  //   trip: {
  //     location: planLocation.name,
  //     dateRange: {
  //       start: startDateInput.value,
  //       end: endDateInput.value,
  //     },
  //     attendees: attendees.concat(fullUserInfo._id),
  //   },
  //   userData: {
  //     scheduledUsers: scheduledUsers.concat(fullUserInfo._id),
  //   },
  // };

  async function createRelationalEntry() {
    try {
      let relationalPayload = {
        // scheduledTrip: "Hardcoded Trip ID",
        // scheduledUsers: scheduledUsers.concat("HardCoded UserID"),
        scheduledTrip: createdTrip._id,
        scheduledUsers: scheduledUsers.concat(fullUserInfo._id),
      };
      await axios({
        method: "POST",
        url: "http://localhost:4000/relational",
        data: relationalPayload,
        header: {
          "Content-Type": "application/json",
        },
      }).then((result) => console.log("result data", result.data));
    } catch (error) {
      console.error("cannot create trip", error);
    }
  }

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
      <br />
      <button onClick={() => createRelationalEntry()}>
        SEND TO RELATIONAL
      </button>
    </>
  );
};

export default CreateTrip;
