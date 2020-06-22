import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import backgroundclimb from "../assets/backgroundclimb.jpg";

//maybe some onclicks?  Or will Nav handle all of this?

const Home = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const getUsername = async () => {
      const useAuth = await Auth.currentUserInfo();
      if (useAuth !== null) {
        console.log(useAuth);
        const gotUser = await useAuth.username;
        console.log(gotUser);
        setUsername(gotUser);
      }
    };
    getUsername();
  }, []);

  return username !== null ? (
    <div>
      <h2>Welcome to Home Page</h2>
      <img
        src={backgroundclimb}
        alt="background"
        style={{ maxWidth: "85vw", maxHeight: "auto" }}
      />
      <br />
      <br />
      <br />
      <br />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Home;
