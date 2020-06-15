import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

//maybe some onclicks?  Or will Nav handle all of this?

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      const useAuth = await Auth.currentUserInfo();
      const gotUser = await useAuth.username;
      setUsername(gotUser);
    };
    getUsername();
  }, []);

  return (
    <div>
      <br /> <br />
      <br />
      <br />
      <h2>Welcome to Home Page, {username}</h2>
      <h2>Welcome to Home Page - this needs a top margin at App level</h2>
      <h2>Welcome to Home Page</h2>
    </div>
  );
};

export default Home;
