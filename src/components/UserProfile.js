import React, { useEffect, useState } from "react";
import axios from "axios";
import { Storage, Auth } from "aws-amplify";

import EditUserProfile from "./EditUserProfile";

//will transition to EditProfile page onclick

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    async function getUserProfile() {
      const useAuth = await Auth.currentUserInfo();
      const gotUser = await useAuth.username;
      const avatarResponse = null;
      const response = await axios({
        method: "GET",
        url: `http://localhost:4000/user?username=${gotUser}`,
        header: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        const profileResponse = response.data;
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

  return toggleEdit ? (
    <>
      <EditUserProfile
        setToggleEdit={setToggleEdit}
        toggleEdit={toggleEdit}
        currentUser={currentUser}
      />
    </>
  ) : (
    <>
      <div>
        <h2>View User Profile</h2>
        <p>{currentUser.username}</p>
        <p>{currentUser.firstname}</p>
        <p>{currentUser.lastname}</p>
      </div>
      <button onClick={() => setToggleEdit(!toggleEdit)}>Edit Profile</button>
    </>
  );
};

export default UserProfile;
