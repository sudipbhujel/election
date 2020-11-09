import React from "react";

import { Container } from "../../globalStyles";
import Card from "../../components/Card";
import { Link } from "react-router-dom";

export default function Candidate(props) {
  console.log(props);
  return (
    <Container style={{ marginTop: "0.5rem", marginBottom: "2rem" }}>
      <h2>Candidate List</h2>
      <Card.Group>
        {props.candidates.map((candidate) => (
          <Card key={candidate.id}>
            <Card.Banner src={candidate.party_logo} />
            <Card.Image src={candidate.image} alt="profile image" />
            <Card.Title>{candidate.name}</Card.Title>
            <Card.SubTitle>{candidate.party_name}</Card.SubTitle>
            <Link to={`candidate/${candidate.id}`}>
              <Card.Button>More &gt;&gt;</Card.Button>
            </Link>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}
