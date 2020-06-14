import React, { useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    width: "25ch",
  },
};

const CreateClimb = ({ boundCreateClimb }) => {
  let nameInput, townInput, stateInput, zipInput, descriptionInput;

  async function postClimb() {
    try {
      let climbToCreate = {
        name: nameInput.value,
        location: {
          town: townInput.value,
          state: stateInput.value,
          zip: Number(zipInput.value),
        },
        description: descriptionInput.value,
        // photos: imageResponse === "" ? "" : imageResponse.key.split("/")[1],
      };
      console.log("ClimbToCreate", climbToCreate);
      await axios({
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
    <div>
      <form
        style={styles.root}
        onSubmit={async (e) => {
          e.preventDefault();
          await postClimb({
            name: nameInput.value,
            location: {
              town: townInput.value,
              state: stateInput.value,
              zip: Number(zipInput.value),
            },
            description: descriptionInput.value,
            // file: file ? file : "",
          });
          navigate("/climb_list");
        }}
      >
        <br />
        <br />
        <br />
        <br />
        <label htmlFor="name">Name of Climb Spot:</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          ref={(node) => (nameInput = node)}
        />
        <label htmlFor="town">Town:</label>
        <input
          id="town"
          type="text"
          placeholder="Town"
          ref={(node) => (townInput = node)}
        />
        <label htmlFor="state">State:</label>

        <input
          id="state"
          type="text"
          placeholder="State"
          ref={(node) => (stateInput = node)}
        />
        <label htmlFor="zip">ZIP:</label>
        <input
          id="zip"
          type="number"
          placeholder="ZIP Code"
          ref={(node) => (zipInput = node)}
        />

        <label htmlFor="description">description:</label>
        <textarea
          id="description"
          rows="7"
          cols="40"
          type="number"
          ref={(node) => (descriptionInput = node)}
        ></textarea>

        {/* <label htmlFor="avatar">Upload a Photo As Your Avatar:</label>
        <input
          type="file"
          accept="image/*"
          id="s3-avatar"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        /> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateClimb;
