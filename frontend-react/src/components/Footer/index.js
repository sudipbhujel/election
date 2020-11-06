import React from "react";

import { Container } from "../../globalStyles";
import { Column, FooterSection, LogoSection, Row } from "./styles/footer";

export default function Footer() {
  return (
    <FooterSection>
      <Container>
        <LogoSection>
          <h1>Election</h1>
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
        </LogoSection>
        <Row>
          <Column>
            <p>+977 9844309479</p>
            <p>info@election.com</p>
            <p>Kapan, Kathmandu</p>
          </Column>
          <Column>
            <p>Privacy and Policies</p>
            <p>Contact us</p>
          </Column>
        </Row>
      </Container>
    </FooterSection>
  );
}
