import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { Storage } from "aws-amplify";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
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
  },
}));

export default function ClimbPage({
  climb,
  handleClose,
  open,
  setPlanLocation,
  planLocation,
}) {
  const classes = useStyles();
  const [imageURL, setImageURL] = useState("");

  console.log("imageFromS3", imageURL);

  useEffect(() => {
    async function pullS3Image() {
      let uuidName = climb.photos[0];
      let result = await Storage.get("finale/" + uuidName, {
        contentType: "image/png",
      }).then((result) => setImageURL(result));
    }
    pullS3Image();
  }, []);

  function goToPlanner(climb) {
    setPlanLocation(climb);
    navigate("/plan_trip");
  }

  return (
    <div>
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
            <img
              src={imageURL}
              alt="climb photos"
              style={{ height: "140px", width: "auto" }}
            />
            <h2 id="transition-modal-title">{climb.name}</h2>
            <p id="transition-modal-description">{climb.description}</p>
            <button onClick={() => goToPlanner(climb)}>Plan A Trip!</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
