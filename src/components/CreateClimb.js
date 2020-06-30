import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "aws-amplify";
import { navigate } from "@reach/router";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

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
    textAlign: "left",
  },
  formContainer: {
    marginTop: "40px",
    margin: "auto",
    maxWidth: "55vw",
    border: "2px solid blue",
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

  const states = [
    {
      value: "AK",
      label: "Alaska",
    },
    {
      value: "AL",
      label: "Alabama",
    },
    {
      value: "AZ",
      label: "Arizona",
    },
    {
      value: "AR",
      label: "Arkansas",
    },
    {
      value: "CA",
      label: "California",
    },
    {
      value: "CO",
      label: "Colorado",
    },
    {
      value: "CT",
      label: "Connecticut",
    },
    {
      value: "DE",
      label: "Delaware",
    },
    {
      value: "FL",
      label: "Florida",
    },
    {
      value: "GA",
      label: "Georgia",
    },
    {
      value: "HI",
      label: "Hawaii",
    },
    {
      value: "ID",
      label: "Idaho",
    },
    {
      value: "IL",
      label: "Illinois",
    },
    {
      value: "IN",
      label: "Indiana",
    },
    {
      value: "IA",
      label: "Iowa",
    },
    {
      value: "KS",
      label: "Kansas",
    },
    {
      value: "KY",
      label: "Kentucky",
    },
    {
      value: "LA",
      label: "Louisiana",
    },
    {
      value: "ME",
      label: "Maine",
    },
    {
      value: "MD",
      label: "Maryland",
    },
    {
      value: "MA",
      label: "Massachusetts",
    },
    {
      value: "MI",
      label: "Michigan",
    },
    {
      value: "MN",
      label: "Minnesota",
    },
    {
      value: "MS",
      label: "Mississippi",
    },
    {
      value: "MO",
      label: "Missouri",
    },
    {
      value: "MT",
      label: "Montana",
    },
    {
      value: "NE",
      label: "Nebraska",
    },
    {
      value: "NV",
      label: "Nevada",
    },
    {
      value: "NH",
      label: "New Hampshire",
    },
    {
      value: "NM",
      label: "New Mexico",
    },
    {
      value: "NY",
      label: "New York",
    },
    {
      value: "NC",
      label: "North Carolina",
    },
    {
      value: "ND",
      label: "North Dakota",
    },
    {
      value: "OH",
      label: "Ohio",
    },
    {
      value: "OK",
      label: "Oklahoma",
    },
    {
      value: "OR",
      label: "Oregon",
    },
    {
      value: "PA",
      label: "Pennsylvania",
    },
    {
      value: "RI",
      label: "Rhode Island",
    },
    {
      value: "SC",
      label: "South Carolina",
    },
    {
      value: "SD",
      label: "South Dakota",
    },
    {
      value: "TN",
      label: "Tennessee",
    },
    {
      value: "TX",
      label: "Texas",
    },
    {
      value: "UT",
      label: "Utah",
    },
    {
      value: "VT",
      label: "Vermont",
    },
    {
      value: "VA",
      label: "Virginia",
    },
    {
      value: "WA",
      label: "Washington",
    },
    {
      value: "WV",
      label: "West Virginia",
    },
    {
      value: "WI",
      label: "Wisconsin",
    },

    {
      value: "WY",
      label: "Wyoming",
    },
  ];

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
        <p style={{ alignFont: "left" }}>
          Bouldering is a burgeoning sport, and we may not have every location
          listed on our site. If you're aware of missing climbs, we welcome you
          to submit these to our database! Please provide:
        </p>
        <ul className={classes.list}>
          <li>A unique name for the spot;</li>
          <li>The nearest town, state, and ZIP code;</li>
          <li>
            A thorough description - for example, the range of route difficulty,
            parking situation, camping or lodging on-site?
          </li>
        </ul>
        <p style={{ fontWeight: 500 }}>
          Thanks for your help growing the sport!
        </p>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.formLine}>
          <TextField
            required
            id="locationName"
            label="Location Name"
            variant="outlined"
            onChange={(e) => setClimbName(e.target.value)}
          />
        </div>
        <div className={classes.formLine}>
          <TextField
            id="locationTown"
            label="Town"
            variant="outlined"
            onChange={(e) => setClimbTown(e.target.value)}
          />
          <TextField
            id="locationState"
            select
            label="Choose State"
            value={climbState}
            variant="outlined"
            onChange={(e) => setClimbState(e.target.value)}
          >
            {states.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="locationZip"
            label="Zip"
            variant="outlined"
            onChange={(e) => setClimbZip(e.target.value)}
          />
        </div>
        <div className={classes.formLine}>
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            placeholder="Description here..."
            variant="outlined"
            onChange={(e) => setClimbDescription(e.target.value)}
          />
        </div>
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
