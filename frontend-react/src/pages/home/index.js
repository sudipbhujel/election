import React from "react";

import { Container } from "../../globalStyles";
import Card from "../../components/Card";

function Home({ ...props }) {
  // console.log(props)
  return (
    <Container>
      <Card.Group>
        {props.candidates.map((candidate) => (
          <Card key={candidate.id}>
            <Card.Banner src={candidate.party_logo} />
            <Card.Image src={candidate.image} alt="profile image" />
            <Card.Title>{candidate.name}</Card.Title>
            <Card.SubTitle>{candidate.party_name}</Card.SubTitle>
            <Card.Description>
              {candidate.bio.substring(0, 60)}...more&gt;&gt;
            </Card.Description>
            <Card.Button>Vote</Card.Button>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export default Home;
