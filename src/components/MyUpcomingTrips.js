import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

const MyUpcomingTrips = ({ currentUser }) => {
  const [userTrips, setUserTrips] = useState([]);

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
              >
                Edit Trip
              </Button>
              <Button
                style={styles.buttons}
                size="small"
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyUpcomingTrips;

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
