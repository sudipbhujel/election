import React from "react";

import useLogout from "./useLogout";

import { Button } from "../../globalStyles";

export default function Logout() {
  const { removeAuthToken } = useLogout();
  const handleClick = (e) => {
    e.preventDefault();
    removeAuthToken();
  };
  return (
    <div>
      <p>Do you want to logout?</p>
      <Button onClick={handleClick}>Yes</Button>
      {/* <Button>No</Button> */}
    </div>
  );
}
