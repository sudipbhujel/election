import React, { useState } from "react";

import {
  AccordionWrapper,
  AccordionHeader,
  Title,
  Controller,
  Body,
} from "./styles/accordion";

import { Container } from "../../globalStyles";

export default function Accordion({ children, title, ...restProps }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AccordionWrapper {...restProps}>
      <Container>
        <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
          <Title>
            <h5>{title}</h5>
          </Title>
          <Controller>{isOpen ? "-" : "+"}</Controller>
        </AccordionHeader>
        {isOpen && <div>{children}</div>}
      </Container>
    </AccordionWrapper>
  );
}

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  return <Body {...restProps}>{children}</Body>;
};
