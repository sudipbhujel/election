import React, { useState } from "react";

import { FaUser, FaKey, FaFileImage } from "react-icons/fa";

import { Container, Button } from "../../globalStyles";
import Form from "../../components/Form";
import useAuths from "./useAuths";

export default function Login() {
  const [cit, setCit] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const { addAuthToken, user, error: errorMessage } = useAuths();

  const handleClick = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("face_image", file);
    data.append("citizenship_number", cit);
    data.append("password", password);
    addAuthToken(data);
  };
  return (
    <Container>
      <Form>
        <Form.Container width="30rem">
          <Form.Header>Login</Form.Header>
          <Form.Row>
            <Form.Input
              type="text"
              value={cit}
              onChange={(e) => setCit(e.target.value)}
              placeholder="Citizenship Number"
            />
            <Form.Icon>
              <FaUser />
            </Form.Icon>
          </Form.Row>
          <Form.Row>
            <Form.Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Form.Icon>
              <FaKey />
            </Form.Icon>
          </Form.Row>
          <Form.Row>
            <Form.Input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Form.Icon>
              <FaFileImage />
            </Form.Icon>
          </Form.Row>
          <Button
            primary
            style={{ display: " block", margin: "0 auto" }}
            onClick={(event) => handleClick(event)}
          >
            Login
          </Button>
        </Form.Container>
      </Form>
    </Container>
  );
}
