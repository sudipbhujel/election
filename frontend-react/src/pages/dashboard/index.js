import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

import { Container } from "../../globalStyles";
import { Row, Column, Card } from "./styles/dashbord";

export default function Dashboard(props) {
  const [chartData, setChartdata] = useState(null);

  useEffect(() => {
    setChartdata({
      labels: props.candidates.map((candidate) => candidate.name),
      datasets: [
        {
          label: "Population",
          data: props.candidates.map((candidate) => candidate.vote_count),
          backgroundColor: ["#4d80e4", "#ec0101", "rgb(155,155,0)"],
        },
      ],
    });
  }, [props.candidates]);

  return (
    <Container style={{ marginBottom: "4rem" }}>
      {props.state.state !== 2 ? (
        <h2>Result will be displayed here</h2>
      ) : (
        <>
          <h2>Result</h2>
          <Row>
            <Column>
              {chartData && (
                <Pie
                  data={chartData}
                  width={10}
                  height={10}
                  // options={{ maintainAspectRatio: false }}
                  options={{
                    title: {
                      display: true,
                      text: "Vote Count",
                      fontSize: 15,
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                  }}
                />
              )}
            </Column>
            <Column>
              <Card>
                <h2>Statistics</h2>
                <h4>Total Candidates: {props.stats.total_candidate} </h4>
                <h4>Total Voters: {props.stats.total_voter} </h4>
                <h4>
                  Total Vote Dropped:{" "}
                  {typeof props.stats.total_voter_dropped === "undefined"
                    ? 0
                    : props.stats.total_voter_dropped}
                </h4>
              </Card>
              <Card>
                <h2>Winner</h2>
                <div>
                  <img src={props.winner && props.winner.image} alt="" />
                  <h5>JOHN DOE</h5>
                </div>
                {/* <h4>Total Voters: 15 000</h4>
            <h4>Total Vote Dropped: 10 000 </h4> */}
              </Card>
            </Column>
          </Row>
        </>
      )}
    </Container>
  );
}
