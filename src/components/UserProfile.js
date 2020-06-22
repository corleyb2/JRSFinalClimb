import React, { useEffect, useState } from "react";
import axios from "axios";
import { Storage, Auth } from "aws-amplify";
import Button from "@material-ui/core/Button";

import EditUserProfile from "./EditUserProfile";
import MyUpcomingTrips from "./MyUpcomingTrips";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [userAvatar, setUserAvatar] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [isLoading, toggleLoading] = useState(true);

  useEffect(() => {
    getUserProfile && getUserProfile();
  }, []);

  async function getUserProfile() {
    try {
      const useAuth = await Auth.currentUserInfo();
      const gotUser = await useAuth.username;
      await axios({
        method: "GET",
        url: `http://localhost:4000/user?username=${gotUser}`,
        header: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        setCurrentUser(response.data);
        if (response.data.avatar !== undefined) {
          const uuid = response.data.avatar;
          const getS3response = await Storage.get("finale/" + uuid, {
            contentType: "image/png",
          });
          setUserAvatar(getS3response);
          toggleLoading(false);
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
  ) : isLoading ? (
    <div>Loading...</div>
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
              V{currentUser.skillLevel && currentUser.skillLevel.low} to V
              {currentUser.skillLevel && currentUser.skillLevel.high}
            </p>
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setToggleEdit(!toggleEdit)}
      >
        Edit Profile
      </Button>
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
