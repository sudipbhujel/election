import React from "react";
import { Form, Field } from "react-final-form";

import Spinner from "../../../components/Spinner";
import { Button, Container } from "../../../globalStyles";

import {
  BallotContainer,
  Header,
  Info,
  Main,
  Group,
  Column,
  Card,
  Avatar,
  CardInfo,
  Swastik,
  Submit,
} from "../styles/ballot";
import useVote from "../useVote";

const validate = (values) => {
  const errors = {};
  if (!values.candidate_id) {
    errors.candidate_id = "Required";
  }
  return errors;
};

export default function Ballot(props) {
  const { ballot, doVote } = useVote();

  const onSubmit = (values) => {
    const data = new FormData();
    data.append("candidate_id", values.candidate_id);
    data.append("private_key", ballot.data.private_key);
    doVote(data);
  };

  return (
    <div>
      <Container>
        <BallotContainer>
          <Header>
            <h1>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="25.1783"
                  height="7.71539"
                  rx="3.85769"
                  transform="matrix(0.944916 -0.327314 0.804704 0.593676 0 16.8303)"
                  fill="#4D80E4"
                />
                <rect
                  width="25.1783"
                  height="7.71539"
                  rx="3.85769"
                  transform="matrix(0.944916 -0.327314 0.804704 0.593676 0 25.4197)"
                  fill="#4D80E4"
                />
                <rect
                  width="25.1783"
                  height="7.71539"
                  rx="3.85769"
                  transform="matrix(0.944916 -0.327314 0.804704 0.593676 0 8.24121)"
                  fill="#46B3E6"
                />
              </svg>
              <span> ELECTION COMMISION </span>
            </h1>
            <h2>Kapan, Kathmandu</h2>
            <h4>c1c39c07-a0e1-41ba-b02f-4dc5de898f16</h4>
          </Header>
          <Info>
            <p>You can’t edit after you submitted a ballot.</p>
            <p>Select your candidate and submit the ballot.</p>
          </Info>
          <Main>
            <h3>Candidates</h3>

            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({
                handleSubmit,
                reset,
                submitting,
                pristine,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Group>
                    {props.candidates.map((candidate) => (
                      <Column key={candidate.id}>
                        <Card>
                          <Avatar>
                            <img src={candidate.image} alt="" />
                          </Avatar>
                          <CardInfo>
                            <h3>{candidate.name}</h3>
                            <h4>{candidate.party_name}</h4>
                            <p>{candidate.id}</p>
                          </CardInfo>
                        </Card>
                        <Swastik>
                          <Field name="candidate_id" type="radio">
                            {({ input, checked, meta }) => (
                              <>
                                <input
                                  {...input}
                                  checked={checked}
                                  value={candidate.id}
                                  id={candidate.id}
                                />
                                <label htmlFor={candidate.id}>Choose</label>
                                <svg
                                  width="115"
                                  height="115"
                                  viewBox="0 0 115 115"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="57.5"
                                    cy="57.5"
                                    r="55"
                                    fill="white"
                                    stroke="#03C4A1"
                                    strokeWidth="5"
                                  />
                                  <g clipPath="url(#clip0)">
                                    <path
                                      d="M64.692 37.2494V51.1474H91.2695V90.0411H78.5899V63.827H64.692V91.2692H23.5039V78.5896H52.0124V63.827H24.5701V25.4965H37.2497V51.1477H52.0124V24.5698H92.336V37.2494H64.692Z"
                                      fill="#03C4A1"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0">
                                      <rect
                                        width="68.8321"
                                        height="68.8321"
                                        fill="white"
                                        transform="translate(23.5039 23.5037)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                                {meta.error && meta.touched && null}
                              </>
                            )}
                          </Field>
                        </Swastik>
                      </Column>
                    ))}
                  </Group>
                  <Submit>
                    <Button primary type="submit" disabled={submitting}>
                      Submit
                    </Button>
                  </Submit>
                  {ballot.loading && <Spinner text="Submitting..." />}
                </form>
              )}
            />
          </Main>
        </BallotContainer>
      </Container>
    </div>
  );
}
