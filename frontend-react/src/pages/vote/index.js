import React from "react";

import { Button, Container } from "../../globalStyles";
import { Header, Main } from "./styles/vote";

export default function Vote() {
  return (
    <Container>
      <Header>
        <h1>Request a ballot</h1>
        <p>Submit your voter ID card to request electronic ballot paper.</p>
        <p>This information must match your voter registration record.</p>
      </Header>
      <Main>
        <form action="#">
          <input name="id_card" type="file" id="id-card" />

          <Button>Request</Button>
        </form>
      </Main>
    </Container>
  );
}
