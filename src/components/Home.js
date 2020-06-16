import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

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
      <br />
      <br />
      <br />
      <br />
      <h2>Welcome to Home Page, {username}</h2>
      <h2>this needs a top margin at App level</h2>
      <h2>Welcome to Home Page</h2>
    </div>
  ) : (
    <div>
      <p> Loading </p>
    </div>
  );
};

export default Home;
