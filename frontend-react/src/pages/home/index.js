<<<<<<< HEAD
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useProfile from "../useProfile";
import { Container } from "../../globalStyles";
import Card from "../../components/Card";

export default function Home({ ...props }) {
  // console.log(props)
  return (
    <>
      <Container>
        <Card.Group>
          {props.candidates.map((candidate) => (
            <Card id={candidate.id}>
              <Card.Banner src={candidate.party_logo} />
              <Card.Image
                src={candidate.image}
                alt="profile image"
              />
              <Card.Title>{ candidate.name }</Card.Title>
              <Card.SubTitle>{ candidate.party_name }</Card.SubTitle>
              <Card.Description>
                {candidate.bio.substring(0, 60)}...more&gt;&gt;
              </Card.Description>
              <Card.Button>Vote</Card.Button>
            </Card>
          ))}
        </Card.Group>
      </Container>
    </>
  );
}
=======
import React from 'react'

function Home() {
    return (
        <div>
            Home
            <h1>Hello</h1>
        </div>
    )
}

export default Home
>>>>>>> origin/frontend
