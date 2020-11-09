import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import useAuths from "../useAuth";
import { Container, Button } from "../../../globalStyles";

export default function UserActivate(props) {
  const { requestUserActivate, activate, error } = useAuths();
  const history = useHistory();
  useEffect(() => {
    if (activate.verified) {
      history.push("/");
    }
  }, [activate.verified]);
  const handleSubmit = (e) => {
    e.preventDefault();
    requestUserActivate({ uid: props.uid, token: props.token });
  };
  return (
    <Container>
      <h2>User Activate</h2>
      <p>Activate your account to proceed forward.</p>
      <div style={{ marginTop: "1rem" }}>
        <form method="POST" onSubmit={handleSubmit}>
          <Button primary type="submit">
            Activate
          </Button>
        </form>
      </div>
    </Container>
  );
}
