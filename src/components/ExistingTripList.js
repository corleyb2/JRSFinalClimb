import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import JoinExistingTrip from "./JoinExistingTrip";

export default function ExistingTripList({ listUpcomingTrips, fullUserInfo }) {
  const [pickedTrip, setPickedTrip] = useState({});
  const [joinRender, setJoinRender] = useState(false);

  const [open, setOpen] = React.useState(false);

  console.log("listUpcoming on ExistingTripList component", listUpcomingTrips);
  console.log("picked trip - should be nothing at first", pickedTrip);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <p style={styles.name}>{trip && trip.location}</p>
            <p style={styles.dates}>
              {trip.dateRange && trip.dateRange.start} to{" "}
              {trip.dateRange && trip.dateRange.end}
            </p>
            {/* <p>
              Need to figure out how to get the attendees, going to relational
            </p> */}
            <p>List of Attendees Here</p>
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
