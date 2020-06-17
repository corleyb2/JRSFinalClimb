import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Storage, Auth } from "aws-amplify";
import { navigate } from "@reach/router";

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    width: "25ch",
  },
  contentLine: {
    display: "flex",
    flexDirection: "row",
  },
};

const CreateUserProfile = () => {
  const [avatarFile, setAvatarFile] = useState("");
  const [authUsername, setAuthUsername] = useState("");

  useEffect(() => {
    const extractUsername = async () => {
      const fromAuth = await Auth.currentUserInfo();
      const gotUser = await fromAuth.username;
      setAuthUsername(gotUser);
    };
    extractUsername();
  }, []);

  let firstnameInput,
    lastnameInput,
    passwordInput,
    skillHighInput,
    skillLowInput;

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
        // password: passwordInput.value,
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        skillLevel: {
          high: Number(skillHighInput.value),
          low: Number(skillLowInput.value),
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
    <div style={styles.formStyle}>
      <form
        style={styles.root}
        onSubmit={async (e) => {
          e.preventDefault();
          await postNewUser();
        }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br /> <br /> <br />
        <div style={styles.contentLine}>
          <label htmlFor="username">Username:</label>
          <p>{authUsername}</p>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            ref={(node) => (passwordInput = node)}
          />
        </div>
        <div style={styles.contentLine}>
          <label htmlFor="firstname">First Name:</label>
          <input
            id="firstname"
            type="text"
            placeholder="First Name"
            ref={(node) => (firstnameInput = node)}
          />
        </div>
        <div style={styles.contentLine}>
          <label htmlFor="lastname">Last Name:</label>
          <input
            id="lastname"
            type="text"
            placeholder="Last Name"
            ref={(node) => (lastnameInput = node)}
          />
        </div>
        <div style={styles.contentLine}>
          <label htmlFor="skillHigh">Skill Level - Top:</label>
          <input
            id="skillHigh"
            type="number"
            min="0"
            max="12"
            ref={(node) => (skillHighInput = node)}
          />
          <label htmlFor="skillLow">Skill Level - Low End</label>
          <input
            id="skillLow"
            type="number"
            min="0"
            max="12"
            ref={(node) => (skillLowInput = node)}
          />
        </div>
        <label htmlFor="avatar">Upload an Avatar</label>
        <input
          type="file"
          accept="image/*"
          id="s3-avatar"
          onChange={(e) => {
            setAvatarFile(e.target.files[0]);
          }}
        />
        <p>
          This site uses the V Scale to grade climbing aptitude. Not familiar?
          Click below to find out more.
        </p>
        <p>
          https://www.rei.com/learn/expert-advice/climbing-bouldering-rating.html
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateUserProfile;
