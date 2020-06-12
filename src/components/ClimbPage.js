import React, { useEffect, useState } from "react";

import CreateTrip from "./CreateTrip";

//details for each climbing location
//accessible from click of list

//Plan Trip should be accessible on click from here

const ClimbPage = ({ climb }) => {
  console.log("climb", climb);

  return (
    <div>
      <br />
      <br />
      <br />
      <h2>{climb.name}</h2>
      <h4>{climb.description}</h4>
      <p>{climb.location.state}</p>
      <p>{climb.location.town}</p>
      <p>{climb.location.zip}</p>
      <p>{climb.description}</p>
    </div>
  );
};

export default ClimbPage;
