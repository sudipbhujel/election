import React from "react";

import useLogout from "./useLogout";

import { Container, Button } from "../../globalStyles";

export default function Logout() {
  const { removeAuthToken } = useLogout();
  const handleClick = (e) => {
    e.preventDefault();
    removeAuthToken();
  };
  return (
    <Container>
      <h3>Do you want to logout?</h3>
      <Button onClick={handleClick}>Yes</Button>
      {/* <Button>No</Button> */}
    </Container>
  );
}
