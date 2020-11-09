import React from "react";
import createDOMPurify from "dompurify";

import { Container } from "../../../globalStyles";
import {
  HeaderSection,
  ImageSection,
  InfoSection,
  StatusSection,
  Styles,
} from "./styles";
import Spinner from "../../../components/Spinner";

const DOMPurify = createDOMPurify(window);

export default function PartyDetail({ party, isLoading, error }) {
  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {typeof party === "undefined" ? (
            <Spinner />
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(party.slogan),
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(party.manifesto),
                  }}
                />
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
