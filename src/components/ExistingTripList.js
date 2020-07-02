import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

import JoinExistingTrip from "./JoinExistingTrip";

export default function ExistingTripList({
  listUpcomingTrips,
  fullUserInfo,
  planLocation,
}) {
  const [pickedTrip, setPickedTrip] = useState({});
  const [joinRender, setJoinRender] = useState(false);

  const [open, setOpen] = React.useState(false);

  console.log(listUpcomingTrips);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //This axios call is querying by a Climb's ID, rather than a Trip's ID.
  //Need Trip ID to link to Relational table & get attendees

  return joinRender ? (
    <JoinExistingTrip
      pickedTrip={pickedTrip}
      setJoinRender={setJoinRender}
      handleClose={handleClose}
      open={open}
      fullUserInfo={fullUserInfo}
    />
  ) : (
    <div style={styles.gridContainer}>
      {listUpcomingTrips &&
        listUpcomingTrips.map((trip) => (
          <div key={trip._id} style={styles.listLine}>
            <p style={styles.name}>
              {trip.scheduledTrip && trip.scheduledTrip.location}
            </p>
            <p style={styles.dates}>
              {trip.scheduledTrip.dateRange &&
                trip.scheduledTrip.dateRange.start}{" "}
              to{" "}
              {trip.scheduledTrip.dateRange && trip.scheduledTrip.dateRange.end}
            </p>
            {/* This will be map or filter to get same trip / multiple users on same line */}
            <p>
              {trip.scheduledUser && trip.scheduledUser.firstname}{" "}
              {trip.scheduledUser && trip.scheduledUser.lastname}
            </p>
            <div style={styles.buttonContainer}>
              <Button
                style={styles.buttons}
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  setPickedTrip(trip);
                  setJoinRender(true);
                  handleOpen();
                }}
              >
                Join Trip!
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}

const styles = {
  gridContainer: {
    display: "flex",
    flexDirection: "column",

    maxWidth: "50vw",
    margin: "auto",
  },
  listLine: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px dotted black",
    maxWidth: "50vw",
  },
  name: {
    padding: "10px",
    fontWeight: "650",
    width: "20vw",
    textAlign: "left",
  },
  dates: {
    padding: "10px",
    width: "25vw",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  buttons: {
    height: "30px",
    width: "8vw",
    alignItems: "center",
    margin: "20px",
  },
};
