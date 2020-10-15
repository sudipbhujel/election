import React from "react";
import createDOMPurify from "dompurify";

import { Container } from "../../../globalStyles";

const DOMPurify = createDOMPurify(window);

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
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(party.description) }} />
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(party.slogan) }} />
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(party.manifesto) }} />
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(party.plans) }} />
        </>
      )}
    </Container>
  );
}
