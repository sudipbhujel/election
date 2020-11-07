import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Button, Container } from "../../globalStyles";
import { Header, Main } from "./styles/vote";

import useVote from "./useVote";

export default function Vote() {
  const [card, setCard] = useState(null);
  const { ballot, error, requestBallot, doVote } = useVote();

  const history = useHistory();

  useEffect(() => {
    if (ballot.data.status && !ballot.data.voted) {
      history.push("/vote/ballot");
    }
  }, [ballot.data]);

  const onCardChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setCard(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (card) {
      const idCard = dataURItoBlob(card);
      const data = new FormData();
      data.append("id_card", idCard, "id_card.png");

      requestBallot(data);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Request a ballot</h1>
        <p>Submit your voter ID card to request electronic ballot paper.</p>
        <p>This information must match your voter registration record.</p>
      </Header>
      <Main>
        <form method="POST" onSubmit={onSubmit}>
          <input
            name="id_card"
            type="file"
            onChange={onCardChange}
            placeholder="ID card"
            accept="image/*"
          />
          <img src={card} />
          <br />
          <Button type="submit">Request</Button>
        </form>
      </Main>
    </Container>
  );
}
