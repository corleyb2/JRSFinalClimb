import React, { useEffect } from "react";

//will transition to EditProfile page onclick

const UserProfile = ({ boundGetUserProfile, profile, avatar }) => {
  console.log("profile", profile);

  useEffect(() => {
    boundGetUserProfile();
  }, []);

  return (
    <div>
      <h2>View User Profile</h2>
      Type in Username:
      <p>{profile.username}</p>
      <p>{profile.firstname}</p>
      <p>{profile.lastname}</p>
    </div>
  );
};

export default UserProfile;
