import React, { useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

const EditUserProfile = ({ setToggleEdit, toggleEdit, currentUser }) => {
  let firstnameInput, lastnameInput, skillHighInput, skillLowInput;

  async function updateUser() {
    try {
      // let imageResponse = "";
      // if (avatarFile !== "") {
      //   let extension = avatarFile.name.split(".")[1];
      //   let uuidName = uuidv4() + "." + extension;
      //   imageResponse = await Storage.put("finale/" + uuidName, avatarFile, {
      //     level: "public",
      //     contentType: "image/png",
      //   });
      // }
      // console.log("43", imageResponse);
      let modifiedProfile = {
        username: currentUser.username,
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        skillLevel: {
          high: Number(skillHighInput.value),
          low: Number(skillLowInput.value),
        },
        // avatar: imageResponse === "" ? "" : imageResponse.key.split("/")[1],
      };
      console.log(modifiedProfile);

      const response = await axios({
        method: "put",
        url: `http://localhost:4000/user?_id=${currentUser._id}`,
        data: modifiedProfile,
        header: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log("response", response);
        navigate("/user");
      });
    } catch (error) {
      console.error("Error making edits", error);
    }
  }

  return (
    <div>
      <form
        style={styles.formStyle}
        onSubmit={async (e) => {
          e.preventDefault();
          await updateUser();
          await setToggleEdit(!toggleEdit);
        }}
      >
        <label htmlFor="firstname">First Name:</label>
        <input
          id="firstname"
          type="text"
          defaultValue={currentUser.firstname}
          ref={(node) => (firstnameInput = node)}
          style={styles.inputs}
        />
        <label htmlFor="lastname">Last Name:</label>
        <input
          id="lastname"
          type="text"
          defaultValue={currentUser.lastname}
          ref={(node) => (lastnameInput = node)}
          style={styles.inputs}
        />
        <label htmlFor="skillHigh">Skill Level - Top:</label>
        <input
          id="skillHigh"
          type="number"
          min="0"
          max="12"
          defaultValue={currentUser.skillLevel.high}
          ref={(node) => (skillHighInput = node)}
        />
        <label htmlFor="skillLow">Skill Level - Low End</label>
        <input
          id="skillLow"
          type="number"
          min="0"
          max="12"
          defaultValue={currentUser.skillLevel.low}
          ref={(node) => (skillLowInput = node)}
        />

        {/* <label htmlFor="bio">Tell Us About Yourself:</label>
        <textarea
          id="bio"
          type="text"
          defaultValue={currentUser.}
          ref={(node) => (bioInput = node)}
          style={styles.textarea}
        ></textarea> */}
        {/* <input
          type="file"
          accept="image/*"
          id="s3-avatar"
          style={styles.inputs}
          onChange={(e) => {
            setAvatar(e.target.files[0].name);
          }}
        />
        {currentUser.avatar === "" ? (
          <div>
            <img src={defaultAvatar} style={styles.avatar} />
          </div>
        ) : (
          <div>
            <img src={currentUser.avatar} style={styles.avatar} />
          </div>
        )} */}
        <div style={styles.buttonWrapper}>
          <div style={styles.buttons}>
            <button type="submit">Submit Updates</button>
          </div>
          <div style={styles.buttons}>
            <button
              size="small"
              variant="contained"
              onClick={() => setToggleEdit(!toggleEdit)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUserProfile;

const styles = {
  formStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    margin: "auto",
    background: "white",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  inputs: {
    width: 250,
    marginBottom: 10,
    marginTop: 4,
    borderRadius: 8,
    border: "1px solid black",
    boxShadow: "inset 0px 0px 1.5px 1.5px gray",
    padding: 10,
    fontFamily: "sans-serif",
  },
  textarea: {
    width: 250,
    margin: 20,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 4,
    border: "1px solid black",
    boxShadow: "inset 0px 0px 1.5px 1.5px gray",
    padding: 10,
    fontFamily: "sans-serif",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  buttons: {
    margin: "10px",
  },
};
