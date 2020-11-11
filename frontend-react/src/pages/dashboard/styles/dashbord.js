import styled from "styled-components/macro";
import { RowCSS, ColumnCSS } from "../../../globalStyles";

export const Row = styled.div`
  ${RowCSS}
  align-items: start;
  margin: 1rem 0;
`;

export const Column = styled.div`
  ${ColumnCSS}
  margin-bottom: 0.5rem;
`;

export const Card = styled.div`
  padding: 0.5rem;
  margin: 0.8rem 0;
  box-shadow: 2px 2px 17px 0px rgba(50, 50, 50, 0.2);
  border-radius: 5px;

  h2 {
  }

  h4 {
    font-weight: normal;
  }

  div {
    display: flex;
    align-items: center;

    height: 30px;

    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 5px;
      object-fit: cover;
    }
  }
`;
