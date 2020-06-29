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

const JoinExistingTrip = ({
  pickedTrip,
  setJoinRender,
  handleClose,
  open,
  fullUserInfo,
}) => {
  const [messageContent, setMessageContent] = useState("");

  console.log("pickedTrip^%^%^", pickedTrip);

  const classes = useStyles();

  async function joinByNewRelational() {
    try {
      const newEntry = {
        creationInfo: {
          userId: fullUserInfo._id,
          tripId: pickedTrip._id,
        },
        matchInfo: pickedTrip.location,
      };
      console.log("SENDING IN AXIOS &&&", newEntry);
      const result = await axios({
        method: "post",
        url: `http://localhost:4000/relational`,
        data: newEntry,
        header: {
          "Content-Type": "application/json",
        },
      });
      console.log("join by creating New Rel", result);
      setJoinRender(true);
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
              {pickedTrip && pickedTrip.location} on{" "}
              {pickedTrip.dateRange && pickedTrip.dateRange.start} thru{" "}
              {pickedTrip.dateRange && pickedTrip.dateRange.end}
            </p>
            <TextField
              id="message"
              label="Message"
              multiline
              rows={4}
              placeholder="Start Typing Here..."
              variant="outlined"
              className={classes.textField}
              onChange={(e) => setMessageContent(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={async (e) => {
                e.preventDefault();
                await joinByNewRelational();
                await handleClose();
                // reRenderTrips();
                // gotta handle the message piece too
              }}
            >
              Join Trip / Send Message
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default JoinExistingTrip;
