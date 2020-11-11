import styled from "styled-components/macro";
import { Container } from "../../../globalStyles";

export const AccordionWrapper = styled.div`
  background-color: rgba(247, 247, 247, 0.5);
  // box-shadow: 0px 0px 14px -5px #4d80e4;
  // margin: 0.5rem;
`;

export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  //   box-shadow: 0px 0px 14px -5px #15FF44;

  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;

  h5 {
    color: #4d80e4;
    margin: 0;
    font-weight: normal;
    font-size: 1.2rem;
  }

  &:hover {
    // box-shadow: 0px 0px 13px -5px #3770e2;
    border-top: 1px #3770e2;
    border-bottom: 1px #3770e2;
  }
`;

export const Content = styled(Container)``;

export const Title = styled.div``;

export const Controller = styled.div`
  color: #4d80e4;
  cursor: pointer;
  font-size: 1.8rem;
`;

export const Body = styled.div`
  //   margin: 0.5rem;
  padding: 0.5rem;
  //   transition:all 1s;
  p {
    margin-top: 1em;
    margin-bottom: 1em;
  }
`;
