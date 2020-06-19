import React, { useEffect, useState } from "react";
import axios from "axios";
import { Storage, Auth } from "aws-amplify";

import EditUserProfile from "./EditUserProfile";
import MyUpcomingTrips from "./MyUpcomingTrips";

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
        await setCurrentUser(response.data);
        if (response.data.avatar === undefined) {
          let response = undefined;
          let avatar = undefined;
          // setUserAvatar("");
        } else {
          const uuid = response.data.avatar;
          const getS3response = await Storage.get("finale/" + uuid, {
            contentType: "image/png",
          });
          await setUserAvatar(getS3response);
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
      <h2>View User Profile</h2>
      <div style={styles.container}>
        <div style={styles.picContainer}>
          <img
            src={userAvatar}
            alt="avatar"
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              border: "3px solid black",
              boxShadow: "3px 3px 7px gray",
            }}
          />
        </div>

        <div style={styles.infoContainer}>
          <div style={styles.infoLabels}>
            <p>Username: </p>
            <p>First Name: </p>
            <p>Last Name: </p>
            <p>Skill Level: </p>
          </div>
          <div style={styles.calledInfo}>
            <p>{currentUser.username}</p>
            <p>{currentUser.firstname}</p>
            <p>{currentUser.lastname}</p>
            <p>
              V{currentUser.skillLevel && currentUser.skillLevel.high} to V
              {currentUser.skillLevel && currentUser.skillLevel.low}
            </p>
          </div>
        </div>
      </div>
      <button onClick={() => setToggleEdit(!toggleEdit)}>Edit Profile</button>
      <div style={styles.tripContainer}>
        <h4>My Upcoming Trips:</h4>
        <MyUpcomingTrips currentUser={currentUser} />
      </div>
    </>
  );
};

export default UserProfile;

const styles = {
  container: {
    display: "flex",
    height: "40vh",
    justifyContent: "center",
    alignItems: "center",
  },
  picContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "30px",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    width: "28vw",
    margin: "10px",
    border: "2px solid black",
  },
  infoLabels: {
    margin: "10px",
    fontWeight: "650",
    justifyContent: "start",
  },
  calledInfo: {
    margin: "10px",
    justifyContent: "start",
  },
};
