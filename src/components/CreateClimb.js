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
  headerWrapper: {},
  list: {},
}));

const CreateClimb = () => {
  const classes = useStyles();

  const [climbName, setClimbName] = useState("");
  const [climbTown, setClimbTown] = useState("");
  const [climbState, setClimbState] = useState("");
  const [climbZip, setClimbZip] = useState("");
  const [climbDescription, setClimbDescription] = useState("");
  const [photoFile, setPhotoFile] = useState("");

  let nameInput, townInput, stateInput, zipInput, descriptionInput;
  let photos = [];

  console.log("photoFile", photoFile);
  console.log("name", nameInput);

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
  // let climbToCreate = {
  //   name: nameInput.value,
  //   location: {
  //     town: townInput.value,
  //     state: stateInput.value,
  //     zip: Number(zipInput.value),
  //   },
  //   description: descriptionInput.value,
  //   photos: photos.concat(imageResponse.key.split("/")[1]),
  // }:

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
          <p>Thanks for your help growing the sport!</p>
        </p>
      </div>

      <form
        className={classes.root}
        onSubmit={async (e) => {
          e.preventDefault();
          await postClimb();
          await navigate("/climb_list");
        }}
      >
        <div style={styles.labelControl}>
          <label htmlFor="name">Name of Climb Spot:</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            ref={(node) => (nameInput = node)}
          />
        </div>
        <div style={styles.labelControl}>
          <label htmlFor="town">Town:</label>
          <input
            id="town"
            type="text"
            placeholder="Town"
            ref={(node) => (townInput = node)}
          />
        </div>
        <div style={styles.labelControl}>
          <label htmlFor="state">State:</label>

          <input
            id="state"
            type="text"
            placeholder="State"
            ref={(node) => (stateInput = node)}
          />
        </div>
        <div style={styles.labelControl}>
          <label htmlFor="zip">ZIP:</label>
          <input
            id="zip"
            type="number"
            placeholder="ZIP Code"
            ref={(node) => (zipInput = node)}
          />
        </div>
        <div style={styles.labelControl}>
          <label htmlFor="description">description:</label>
          <textarea
            id="description"
            rows="7"
            cols="40"
            type="number"
            ref={(node) => (descriptionInput = node)}
          ></textarea>
        </div>

        <label htmlFor="picture">Upload a Photo:</label>
        <input
          type="file"
          accept="image/*"
          id="picture"
          onChange={(e) => {
            setPhotoFile(e.target.files[0]);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateClimb;

const styles = {
  formStyle: {
    marginTop: "70px",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    width: "60ch",
  },
};

//   >
//     <div>
//       <TextField
//         required
//         id="locationName"
//         label="Location Name"
//         variant="outlined"
//       />
//       <TextField
//         id="locationTown"
//         label="Town"
//         variant="outlined"
//         onChange={(e) => setClimbTown(e.target.value)}
//       />
//       <TextField
//         id="locationState"
//         label="State"
//         variant="outlined"
//         onChange={(e) => setClimbState(e.target.value)}
//       />
//       <TextField
//         id="locationZip"
//         label="Zip"
//         variant="outlined"
//         onChange={(e) => setClimbZip(e.target.value)}
//       />
//       <TextField
//         id="description"
//         label="Description"
//         multiline
//         rows={4}
//         placeholder="Description here..."
//         variant="outlined"
//         onChange={(e) => setClimbDescription(e.target.value)}
//       />
//       <input
//         accept="image/*"
//         className={classes.input}
//         id="uploadFile"
//         multiple
//         type="file"
//         onChange={(e) => {
//           setPhotoFile(e.target.files[0]);
//         }}
//       />
//       />
//       <label htmlFor="uploadFile">
//         <Button variant="contained" color="primary" component="span">
//           Upload
//         </Button>
//       </label>
//       <Button variant="contained" color="primary">
//         Submit
//       </Button>
//     </div>
//   </form>
// </>

// <div style={styles.formStyle}>
//   <form
//     style={styles.root}
