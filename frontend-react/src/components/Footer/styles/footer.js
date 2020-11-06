import styled from "styled-components/macro";

import { RowCSS, ColumnCSS } from "../../../globalStyles";

export const FooterSection = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 30px 0;
  background-color: #30323d;
  color: #ffffff;
  p {
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.8);
  }

  h1 {
    font-size: 1.5em;
    margin: 0;
    line-height: 1.5;
  }
`;

export const Row = styled.div`
  ${RowCSS}
  display: flex;
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const Column = styled.div`
  ${ColumnCSS}

  &:last-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;

  svg {
    height: 1.5em;
  }
`;
