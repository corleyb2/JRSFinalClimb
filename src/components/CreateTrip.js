import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  returnList: {
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    justifyContent: "center",
  },
}));

const CreateTrip = ({ planLocation, fullUserInfo, setTripFocus }) => {
  const classes = useStyles();

  const [createdTrip, setCreatedTrip] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //planLocation gives the selected climb from climb page
  //full user info gives full object

  async function submitCreatedTrip() {
    try {
      const tripCreationPayload = {
        trip: {
          location: planLocation.name,
          //if wanting to ref, planLocation._id & .populate on server
          dateRange: {
            start: startDate,
            end: endDate,
          },
        },
        userData: {
          scheduledUser: fullUserInfo._id,
        },
      };
      const submission = await axios({
        method: "POST",
        url: "http://localhost:4000/trip",
        data: tripCreationPayload,
        header: {
          "Content-Type": "application/json",
        },
      });
      console.log(submission.data.createdTrip);
      await setStartDate("");
      await setEndDate("");
    } catch (error) {
      console.error("cannot create trip", error);
    }
  }

  return (
    <>
      <h2>Trip Planning to {planLocation.name}</h2>
      <div className={classes.returnList}>
        <p>Not the correct location?</p>
        <button
          style={{ border: "none", backgroundColor: "none" }}
          id="backToList"
          onClick={() => navigate("climbs")}
        >
          Back to List
        </button>
      </div>
      <TextField
        id="date"
        label="Start Date"
        type="date"
        className={classes.textField}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="End Date"
        type="date"
        className={classes.textField}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={async (e) => {
          e.preventDefault();
          await submitCreatedTrip();
        }}
      >
        Submit Trip
      </Button>
    </>
  );
};

export default CreateTrip;
