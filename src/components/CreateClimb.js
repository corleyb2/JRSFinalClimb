import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "aws-amplify";
import { navigate } from "@reach/router";

const CreateClimb = () => {
  const [photoFile, setPhotoFile] = useState("");

  let nameInput, townInput, stateInput, zipInput, descriptionInput;
  let photos = [];

  console.log("photoFile", photoFile);

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
        name: nameInput.value,
        location: {
          town: townInput.value,
          state: stateInput.value,
          zip: Number(zipInput.value),
        },
        description: descriptionInput.value,
        photos: photos.concat(imageResponse.key.split("/")[1]),
      };
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/climb",
        data: climbToCreate,
        header: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log("climb creation response", response);
      });
    } catch (error) {
      console.error("cannot create climb", error);
    }
  }

  return (
    <div style={styles.formStyle}>
      <form
        style={styles.root}
        onSubmit={(e) => {
          e.preventDefault();
          postClimb();
          navigate("/climb_list");
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
    </div>
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
