import React from "react";
import { Link } from "react-router-dom";

import { Container, Button } from "../../globalStyles";
import {
  HeaderSection,
  ImageSection,
  InfoSection,
  StatusSection,
} from "../../components/Render/styles";

export default function Party(props) {
  return (
    <Container style={{ marginBottom: "4rem" }}>
      {props.parties.map((party) => (
        <div key={party.id}>
          <HeaderSection>
            <ImageSection>
              <img
                src={party.logo}
                style={{ minWidth: "200px", maxWidth: "250px" }}
                alt="Party Image"
              />
            </ImageSection>
            <InfoSection>
              <h2>{party.name}</h2>
              <p>{party.slogan}</p>
            </InfoSection>
            <StatusSection>
              <Link to={`/party/${party.id}`}>
                <Button>More &gt;&gt;</Button>
              </Link>
            </StatusSection>
          </HeaderSection>
        </div>
      ))}
    </Container>
  );
}
