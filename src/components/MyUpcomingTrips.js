import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

import EditTrip from "./EditTrip";

const MyUpcomingTrips = ({ currentUser, setRenderUpdatedTrips }) => {
  const [userTrips, setUserTrips] = useState([]);
  const [renderEdit, setRenderEdit] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState("");
  const [editedStart, setEditedStart] = useState("");
  const [editedEnd, setEditedEnd] = useState("");

  const [open, setOpen] = React.useState(false);

  //reRender upon editing - what a monster!
  function reRenderTrips() {
    console.log("SELECTED!!!!!!!", selectedTrip);
    let updatedTrip = userTrips.find(
      (trip) => trip.scheduledTrip._id === selectedTrip.scheduledTrip._id
    );
    console.log("UDPATED******", updatedTrip);

    updatedTrip.scheduledTrip.dateRange.start = editedStart;
    updatedTrip.scheduledTrip.dateRange.end = editedEnd;
    let localUserTrips = [...userTrips];
    localUserTrips[findTripLoop(updatedTrip.scheduledTrip._id)] = updatedTrip;
    setUserTrips(localUserTrips);
  }

  function findTripLoop(id) {
    for (let i = 0; i < userTrips.length; i++) {
      if (userTrips[i].scheduledTrip._id === id) {
        return i;
      }
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function userTrips() {
      const retrievedTrips = await axios({
        method: "get",
        url: `http://localhost:4000/relational?scheduledUser=${currentUser._id}`,
        header: {
          "Content-Type": "application/json",
        },
      });
      console.log("retrieved trips", retrievedTrips.data);
      await setUserTrips(retrievedTrips.data);
    }
    userTrips();
  }, []);

  return (
    <div style={styles.gridContainer}>
      {userTrips &&
        userTrips.map((trip) => (
          <div key={trip._id} style={styles.listLine}>
            <p style={styles.name}>
              {trip.scheduledTrip && trip.scheduledTrip.location}
            </p>
            <p style={styles.dates}>
              {trip.scheduledTrip && trip.scheduledTrip.dateRange.start} to{" "}
              {trip.scheduledTrip && trip.scheduledTrip.dateRange.end}
            </p>
            <div style={styles.buttonContainer}>
              <Button
                style={styles.buttons}
                size="small"
                variant="outlined"
                color="primary"
                onClick={(e) => {
                  setSelectedTrip(trip);
                  setRenderEdit(true);
                  handleOpen();
                }}
              >
                Edit Trip
              </Button>
              <Button
                style={styles.buttons}
                size="small"
                variant="outlined"
                color="secondary"
                onClick={(e) => {
                  setSelectedTrip(trip);
                  //create a function to delete this
                  //create another toggle useState to render new component
                  // -- message other attendees letting them know you're cancelling?
                }}
              >
                Cancel Trip
              </Button>
            </div>
          </div>
        ))}
      {renderEdit ? (
        <EditTrip
          handleClose={handleClose}
          open={open}
          selectedTrip={selectedTrip}
          setRenderUpdatedTrips={setRenderUpdatedTrips}
          reRenderTrips={reRenderTrips}
          editedStart={editedStart}
          editedEnd={editedEnd}
          setEditedEnd={setEditedEnd}
          setEditedStart={setEditedStart}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyUpcomingTrips;

const styles = {
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "65vw",
    margin: "auto",
  },
  listLine: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px dotted black",
    maxWidth: "65vw",
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
    width: "12vw",
    alignItems: "center",
    margin: "20px",
  },
};
