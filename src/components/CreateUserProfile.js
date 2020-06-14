import React from "react";
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

const CreateUserProfile = () => {
  let firstnameInput,
    lastnameInput,
    usernameInput,
    passwordInput,
    skillHighInput,
    skillLowInput;

  async function postNewUser() {
    try {
      let profileToCreate = {
        username: usernameInput.value,
        password: passwordInput.value,
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        skillLevel: {
          high: Number(skillHighInput.value),
          low: Number(skillLowInput.value),
        },
        // file: file ? file : "",
        // avatar: imageResponse === "" ? "" : imageResponse.key.split("/")[1],
      };
      console.log("ProfileToCreate", profileToCreate);
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/user",
        data: profileToCreate,
        header: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log("response", response);
        // navigate("/user");
      });
    } catch (error) {
      console.error("Error creating profile", error);
    }
  }

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
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          ref={(node) => (usernameInput = node)}
        />
        {/* <Input
          variant="outlined"
          id="username"
          type="text"
          placeholder="Username"
          ref={(node) => (usernameInput = node)}
        /> */}
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
        <p>
          This site uses the V Scale to grade climbing aptitude. Not familiar?
          Click below to find out more.
        </p>
        <p>
          https://www.rei.com/learn/expert-advice/climbing-bouldering-rating.html
        </p>
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

export default CreateUserProfile;
