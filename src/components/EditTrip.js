import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  whole: {
    maxWidth: "88vw",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "77vw",
    display: "flex",
    flexDirection: "column",
  },
  topWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  topInfo: {
    margin: "20px",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

const EditTrip = ({
  open,
  handleClose,
  selectedTrip,
  setRenderUpdatedTrips,
  editedStart,
  editedEnd,
  setEditedEnd,
  setEditedStart,
  reRenderTrips,
}) => {
  const classes = useStyles();

  console.log("selectedTrip passed to EditTrip", selectedTrip);

  async function editATrip() {
    try {
      const modifiedTrip = {
        location: selectedTrip.scheduledTrip.location,
        dateRange: {
          start: editedStart,
          end: editedEnd,
        },
      };
      console.log("ModifiedTrip!", modifiedTrip);
      const editedTrip = await axios({
        method: "put",
        url: `http://localhost:4000/trip?_id=${selectedTrip.scheduledTrip._id}`,
        data: modifiedTrip,
        header: {
          "Content-Type": "application/json",
        },
      });
      console.log("editedTrip", editedTrip);
      setRenderUpdatedTrips(true);
    } catch (error) {
      console.log("error editing trip", error);
    }
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Current Trip Details</h2>
            <p>
              {selectedTrip.scheduledTrip &&
                selectedTrip.scheduledTrip.location}{" "}
              on{" "}
              {selectedTrip.scheduledTrip.dateRange &&
                selectedTrip.scheduledTrip.dateRange.start}{" "}
              thru{" "}
              {selectedTrip.scheduledTrip.dateRange &&
                selectedTrip.scheduledTrip.dateRange.end}
            </p>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              className={classes.textField}
              defaultValue={selectedTrip.scheduledTrip.dateRange.start}
              onChange={(e) => setEditedStart(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="End Date"
              type="date"
              className={classes.textField}
              defaultValue={selectedTrip.scheduledTrip.dateRange.end}
              onChange={(e) => setEditedEnd(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={async (e) => {
                e.preventDefault();
                await editATrip();
                await handleClose();
                reRenderTrips();
              }}
            >
              Update Trip
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default EditTrip;
