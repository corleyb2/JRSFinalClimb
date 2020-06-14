import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

import CreateTrip from "./CreateTrip";

//details for each climbing location
//accessible from click of list

//Plan Trip should be accessible on click from here

const ClimbPage = ({ climbId }) => {
  console.log("climbId", climbId);
  const [fetchedClimb, setFetchedClimb] = useState({});

  useEffect(() => {
    async function fetchClimbDetails() {
      const request = await axios({
        method: "GET",
        url: `http://localhost:4000/climb?_id=${climbId}`,
        header: {
          "Content-Type": "application/json",
        },
      });
      console.log("request from ClimbPage", request.data);
      setFetchedClimb(request.data);
    }
    fetchClimbDetails();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <p> {fetchedClimb.name}</p>
      {/* <p> {fetchedClimb.location.town}</p>
      <p>{fetchedClimb.location.state}</p>
      <p>{fetchedClimb.location.zip}</p> */}
      <p>{fetchedClimb.description}</p>
      {/* <p> Match {fetchedClimb[0]._id}</p> */}
      <button type="button" onClick={navigate("/climbs")}>
        Cancel
      </button>
    </div>
  );
};

export default ClimbPage;
