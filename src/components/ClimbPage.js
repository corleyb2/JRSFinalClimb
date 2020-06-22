import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { Storage } from "aws-amplify";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

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

export default function ClimbPage({
  climb,
  handleClose,
  open,
  setPlanLocation,
  planLocation,
}) {
  const classes = useStyles();
  const [imageURL, setImageURL] = useState("");

  // console.log("imageFromS3", imageURL);

  useEffect(() => {
    async function pullS3Image() {
      let uuidName = climb.photos[0];
      if (uuidName !== undefined) {
        let result = await Storage.get("finale/" + uuidName, {
          contentType: "image/png",
        }).then((result) => setImageURL(result));
      }
    }
    pullS3Image();
  }, []);

  function goToPlanner(climb) {
    setPlanLocation(climb);
    navigate("/plan_trip");
  }

  return (
    <div className={classes.whole}>
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
            <div className={classes.topWrapper}>
              <div className={classes.pic}>
                <img
                  src={imageURL}
                  alt="climb photos"
                  style={{ height: "140px", width: "auto" }}
                />
              </div>
              <div className={classes.topInfo}>
                <h2 id="transition-modal-title">{climb.name}</h2>
                <h4 id="transition-modal-title">
                  {climb.location.town}, {climb.location.state}{" "}
                  {climb.location.zip}
                </h4>
              </div>
            </div>
            <p id="transition-modal-description">{climb.description}</p>
            <div className={classes.buttonWrapper}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => goToPlanner(climb)}
              >
                Plan A Trip!
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
