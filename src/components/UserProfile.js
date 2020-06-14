import React, { useEffect, useState } from "react";
import axios from "axios";

//will transition to EditProfile page onclick

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    async function getUserProfile() {
      //establish username here - using auth?  temporary hard code.
      const username = "test1";
      const avatarResponse = null;
      const response = await axios({
        method: "GET",
        url: `http://localhost:4000/user`,
        data: {
          username: username,
        },
        header: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        const profileResponse = response.data;
        console.log("finding user.2", profileResponse.username);
        setCurrentUser(profileResponse);
        // navigate("/user");
      });
      // if (response.data[0][0] == undefined) {
      //   let response = undefined;
      //   let avatar = undefined;
      //   dispatch(getUserProfileSuccess(response, avatar));
      // } else {
      //   console.log(response.data[0][0]);
      //   const uuid = response.data[0][0].avatar;
      //   const avatar = await Storage.get("profilepics/" + uuid, {
      //     // level: "protected",
      //     contentType: "image/png",
      //   });
      //   const profileResp = response.data[0][0];
    }
    getUserProfile();
  }, []);

  return (
    <div>
      <h2>View User Profile</h2>
      <p>{currentUser.username}</p>
      <p>{currentUser.firstname}</p>
      <p>{currentUser.lastname}</p>
    </div>
  );
};

export default UserProfile;
