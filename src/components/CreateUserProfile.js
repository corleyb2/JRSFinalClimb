import React from "react";

const CreateUserProfile = ({ boundCreateProfile }) => {
  let firstnameInput,
    lastnameInput,
    usernameInput,
    passwordInput,
    skillHighInput,
    skillLowInput;

  return (
    <div>
      <form
        // style={styles.formStyle}
        onSubmit={async (e) => {
          e.preventDefault();
          boundCreateProfile &&
            (await boundCreateProfile({
              username: usernameInput.value,
              password: passwordInput.value,
              firstname: firstnameInput.value,
              lastname: lastnameInput.value,
              skillLevel: {
                high: Number(skillHighInput.value),
                low: Number(skillLowInput.value),
              },
              // file: file ? file : "",
            }));
          // insert React-Router's version of navigate
        }}
      >
        <h3>Create Your Profile:</h3>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          ref={(node) => (usernameInput = node)}
        />
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
