import React from "react";
import { Container } from "../../../globalStyles";

export default function PartyDetail({ party, isLoading, error }) {
  console.log(isLoading);
  console.log(party);
  console.log(error);
  return (
    <Container>
      {isLoading ? null : (
        <>
          <p>
            <strong>ID:</strong>
            {party.id}
          </p>
          <p>{party.name}</p>
          <p>{party.description}</p>
          <p>{party.slogan}</p>
          <p>{party.manifesto}</p>
          <p>{party.plans}</p>
        </>
      )}
    </Container>
  );
}
