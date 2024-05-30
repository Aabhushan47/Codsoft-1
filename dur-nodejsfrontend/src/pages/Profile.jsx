import React from "react";
import { isAuthenticated } from "../auth";

const Profile = () => {
  const { user } = isAuthenticated();
  return (
    <>
      <h1>Welcome {user.name}</h1>
    </>
  );
};

export default Profile;
