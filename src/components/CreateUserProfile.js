import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Storage, Auth } from "aws-amplify";
import { navigate } from "@reach/router";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    width: "25ch",
  },
  formStyle: {
    maxWidth: "50vw",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
  contentLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px",
    alignItems: "center",
  },
  buttonWrapper: {
    marginTop: "30px",
    width: "20px",
    margin: "auto",
  },
};

const CreateUserProfile = () => {
  const [avatarFile, setAvatarFile] = useState("");
  const [authUsername, setAuthUsername] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [skillHigh, setSkillHigh] = useState("");
  const [skillLow, setSkillLow] = useState("");

  useEffect(() => {
    const extractUsername = async () => {
      const fromAuth = await Auth.currentUserInfo();
      const gotUser = await fromAuth.username;
      await setAuthUsername(gotUser);
    };
    extractUsername();
  }, []);

  async function postNewUser() {
    try {
      let imageResponse = "";
      if (avatarFile !== "") {
        let extension = avatarFile.name.split(".")[1];
        let uuidName = uuidv4() + "." + extension;
        imageResponse = await Storage.put("finale/" + uuidName, avatarFile, {
          // level: "public",
          contentType: "image/png",
        });
      }
      console.log("43", imageResponse);
      let profileToCreate = {
        username: authUsername,
        firstname: firstName,
        lastname: lastName,
        skillLevel: {
          high: Number(skillHigh),
          low: Number(skillLow),
        },
        avatar: imageResponse === "" ? "" : imageResponse.key.split("/")[1],
      };
      console.log("ProfileToCreate", profileToCreate.avatar);
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/user",
        data: profileToCreate,
        header: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log("response", response);
        navigate("/user");
      });
    } catch (error) {
      console.error("Error creating profile", error);
    }
  }

  return (
    <>
      <h2>Create Your Profile:</h2>
      <div style={styles.formStyle}>
        <div style={styles.contentLine}>
          <h3>
            Username:{"  "} {authUsername}
          </h3>
        </div>
        <div style={styles.contentLine}>
          <TextField
            id="firstname"
            type="text"
            label="FirstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
          {"  "}

          <TextField
            id="lastname"
            label="Last Name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div style={styles.contentLine}>
          <TextField
            id="skillHigh"
            type="number"
            label="Skill - Low"
            min="0"
            max="12"
            onChange={(e) => setSkillLow(e.target.value)}
          />
          {"  "}
          <TextField
            id="skillLow"
            type="number"
            label="Skill-High"
            min="0"
            max="12"
            onChange={(e) => setSkillHigh(e.target.value)}
          />
        </div>
        <div style={styles.contentLine}>
          <label htmlFor="avatar">Upload an Avatar</label>
          <input
            type="file"
            accept="image/*"
            id="s3-avatar"
            onChange={(e) => {
              setAvatarFile(e.target.files[0]);
            }}
          />
        </div>
        <br />
        <br />
        <div style={styles.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            onClick={async (e) => {
              await postNewUser();
            }}
          >
            Submit
          </Button>
        </div>
        <p>
          This site uses the V Scale to grade climbing aptitude. Not familiar?
          Click below to find out more.
        </p>
        <p>
          https://www.rei.com/learn/expert-advice/climbing-bouldering-rating.html
        </p>
      </div>
    </>
  );
};

export default CreateUserProfile;
