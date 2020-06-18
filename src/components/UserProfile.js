import React, { useEffect, useState } from "react";
import axios from "axios";
import { Storage, Auth } from "aws-amplify";

import EditUserProfile from "./EditUserProfile";

//will transition to EditProfile page onclick

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [userAvatar, setUserAvatar] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    getUserProfile();
  }, []);

  async function getUserProfile() {
    try {
      const useAuth = await Auth.currentUserInfo();
      const gotUser = await useAuth.username;
      const response = await axios({
        method: "GET",
        url: `http://localhost:4000/user?username=${gotUser}`,
        header: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        console.log("response", response);
        setCurrentUser(response.data);
        if (response.data.avatar === undefined) {
          let response = undefined;
          let avatar = undefined;
          // setUserAvatar("");
        } else {
          console.log(response.data.avatar);
          const uuid = response.data.avatar;
          const getS3response = await Storage.get("finale/" + uuid, {
            contentType: "image/png",
          });
          console.log("getS3", getS3response);
          setUserAvatar(getS3response);
        }
      });
    } catch (error) {
      console.error("error getting profile", error);
    }
  }

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
        <img
          src={userAvatar}
          alt="climb photos"
          style={{ height: "140px", width: "auto" }}
        />
      </div>
      <button onClick={() => setToggleEdit(!toggleEdit)}>Edit Profile</button>
    </>
  );
};

export default UserProfile;
