import React from "react";
import { Link } from "react-router-dom";

import Card from "../../components/Card";
import { Container } from "../../globalStyles";

export default function Party(props) {
  return (
    <Container>
      <Card.Group>
        {props.parties.map((party) => (
          <Card key={party.id}>
            <Card.Image src={party.logo} alt="logo" />
            <Card.Title>{party.name}</Card.Title>
            <Card.SubTitle>{party.party_name}</Card.SubTitle>
            <Card.Description>
              {party.slogan}...{" "}
              <Link to={`/party/${party.id}`}>more&gt;&gt;</Link>
            </Card.Description>
            <Link to={`/party/${party.id}`}>
              <Card.Button>More&gt;&gt;</Card.Button>
            </Link>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}
