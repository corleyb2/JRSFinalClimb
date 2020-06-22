import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "aws-amplify";
import { navigate } from "@reach/router";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  headerWrapper: {
    maxWidth: "70vw",
    margin: "auto",
  },
  formContainer: {
    marginTop: "40px",
    maxwidth: "50vw",
  },
  list: {
    textAlign: "left",
  },
}));

const CreateClimb = () => {
  const classes = useStyles();

  const [climbName, setClimbName] = useState("");
  const [climbTown, setClimbTown] = useState("");
  const [climbState, setClimbState] = useState("");
  const [climbZip, setClimbZip] = useState("");
  const [climbDescription, setClimbDescription] = useState("");
  const [photoFile, setPhotoFile] = useState("");

  let photos = [];

  async function postClimb() {
    try {
      let imageResponse = "";
      if (photoFile !== "") {
        let extension = photoFile.name.split(".")[1];
        let uuidName = uuidv4() + "." + extension;
        imageResponse = await Storage.put("finale/" + uuidName, photoFile, {
          // level: "public",
          contentType: "image/png",
        });
      }
      console.log("immediately after Axios", imageResponse);
      let climbToCreate = {
        name: climbName,
        location: {
          town: climbTown,
          state: climbState,
          zip: Number(climbZip),
        },
        description: climbDescription,
        photos: photos.concat(imageResponse.key.split("/")[1]),
      };
      console.log("ClimbToCreate", climbToCreate);
      await axios({
        method: "POST",
        url: "http://localhost:4000/climb",
        data: climbToCreate,
        header: {
          "Content-Type": "application/json",
        },
      }).then((result) => {
        console.log("climb creation response", result);
      });
    } catch (error) {
      console.error("cannot create climb", error);
    }
  }

  return (
    <>
      <h2>Add a Location</h2>
      <div className={classes.headerWrapper}>
        <p>
          Bouldering is a burgeoning sport, and we may not have every location
          listed on our site. If you're aware of missing climbs, we welcome you
          to submit these to our database! Please provide:
          <ul className={classes.list}>
            <li>Unique name;</li>
            <li>The nearest town, state, and ZIP code;</li>
            <li>
              A description - please give as many details as you can, like the
              range of route difficulty and any other helpful notes (e.g.,
              parking situation, camping or lodging nearby).
            </li>
          </ul>
          <p style={{ fontWeight: 500 }}>
            Thanks for your help growing the sport!
          </p>
        </p>
      </div>
      <div className={classes.formContainer}>
        <TextField
          required
          id="locationName"
          label="Location Name"
          variant="outlined"
          onChange={(e) => setClimbName(e.target.value)}
        />
        <TextField
          id="locationTown"
          label="Town"
          variant="outlined"
          onChange={(e) => setClimbTown(e.target.value)}
        />
        <TextField
          id="locationState"
          label="State"
          variant="outlined"
          onChange={(e) => setClimbState(e.target.value)}
        />
        <TextField
          id="locationZip"
          label="Zip"
          variant="outlined"
          onChange={(e) => setClimbZip(e.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          placeholder="Description here..."
          variant="outlined"
          onChange={(e) => setClimbDescription(e.target.value)}
        />
        <input
          accept="image/*"
          className={classes.input}
          id="uploadFile"
          multiple
          type="file"
          onChange={(e) => {
            setPhotoFile(e.target.files[0]);
          }}
        />
        <label htmlFor="uploadFile">
          <Button
            variant="contained"
            color="primary"
            component="span"
            id="uploadFile"
            multiple
            type="file"
            onChange={(e) => {
              setPhotoFile(e.target.files[0]);
            }}
          >
            Upload
          </Button>
        </label>
        <Button
          onClick={async () => {
            await postClimb();
            await navigate("/climb_list");
          }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default CreateClimb;

const styles = {
  formStyle: {
    marginTop: "70px",
  },
  list: {
    border: "1px solid blue",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    width: "60ch",
  },
};
