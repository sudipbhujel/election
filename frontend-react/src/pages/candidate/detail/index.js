import React from "react";
import createDOMPurify from "dompurify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { Container } from "../../../globalStyles";
import {
  HeaderSection,
  ImageSection,
  InfoSection,
  Styles,
  VerfiedIcon,
  UnverfiedIcon,
} from "../../../components/Render/styles";

const DOMPurify = createDOMPurify(window);

export default function CandidateDetail({ candidate }) {
  return (
    <Container>
      {typeof candidate === "undefined" ? (
        <>
          <h2 style={{ color: "#cf1b1b" }}>Oops!</h2>
          <h1>404</h1>
          <h3 style={{ fontWeight: "normal" }}>Page Not Found</h3>
        </>
      ) : (
        <>
          <HeaderSection>
            <ImageSection>
              <img
                src={candidate.image}
                style={{ width: "200px", height: "200px" }}
                alt="Candidate Image"
              />
            </ImageSection>
            <InfoSection>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2>{candidate.name}</h2>
                <p>
                  {candidate.is_candidate ? <VerfiedIcon /> : <UnverfiedIcon />}
                </p>
              </div>
              <h3>{candidate.party_name}</h3>
              <h4>Candidate ID: {candidate.id}</h4>
            </InfoSection>
            {/* <StatusSection>
              <h3>Statistics</h3>
              <h4>Total: null</h4>
            </StatusSection> */}
          </HeaderSection>
          <Styles>
            <h2>Bio</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(candidate.bio),
              }}
            />
            <h2>Plans</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(candidate.plans),
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(candidate.manifesto),
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(candidate.plans),
              }}
            />
          </Styles>
        </>
      )}
    </Container>
  );
}
