import React from "react";
import createDOMPurify from "dompurify";

import { Container } from "../../../globalStyles";
import {
  HeaderSection,
  ImageSection,
  InfoSection,
  StatusSection,
  Styles,
} from "../../../components/Render/styles";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";

const DOMPurify = createDOMPurify(window);

export default function PartyDetail({ party, isLoading, error }) {
  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {typeof party === "undefined" ? (
            <>
              <h2 style={{ color: "#cf1b1b" }}>Oops!</h2>
              <h1>404</h1>
              <h3 style={{ fontWeight: "normal" }}>Page Not Found</h3>
            </>
          ) : (
            <>
              <HeaderSection>
                <ImageSection>
                  <img src={party.logo} alt="Party Image" />
                </ImageSection>
                <InfoSection>
                  <h2>{party.name}</h2>
                  <h4>Party ID: {party.id}</h4>
                </InfoSection>
                <StatusSection>
                  <h3>Statistics</h3>
                  <h4>Total Candidates: null</h4>
                </StatusSection>
              </HeaderSection>
              <Styles>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(party.description),
                  }}
                />
                <h2>Slogan</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(party.slogan),
                  }}
                />
                <h2>Manifesto</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(party.manifesto),
                  }}
                />
                <h2>Plans</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(party.plans),
                  }}
                />
              </Styles>
            </>
          )}
        </>
      )}
    </Container>
  );
}
