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

  // async function issueUuid(avatarFile) {
  //   if (avatarFile !== "") {
  //     let fileExtension = avatarFile.name.split(".")[1];
  //     let uuidName = uuidv4() + "." + fileExtension;
  //     let imageResponse = await Storage.put(
  //       "test/" + uuidName,
  //       "Protected Content",
  //       {
  //         level: "protected",
  //         contentType: "image/png",
  //       }
  //     )
  //       .then((result) => console.log("s3 added", result))
  //       .catch((err) => console.error("can't add image", err));
  //   }
  // }

  return (
    <div>
      <form
        style={styles.root}
        onSubmit={async (e) => {
          e.preventDefault();
          postNewUser();
        }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br /> <br /> <br />
        <label htmlFor="username">Username:</label>
        <p>{authUsername}</p>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          ref={(node) => (passwordInput = node)}
        />
        <label htmlFor="firstname">First Name:</label>
        <input
          id="firstname"
          type="text"
          placeholder="First Name"
          ref={(node) => (firstnameInput = node)}
        />
        <label htmlFor="lastname">Last Name:</label>
        <input
          id="lastname"
          type="text"
          placeholder="Last Name"
          ref={(node) => (lastnameInput = node)}
        />
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
