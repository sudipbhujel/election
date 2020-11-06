import styled from "styled-components/macro";

import { RowCSS, ColumnCSS } from "../../../globalStyles";

export const Row = styled.div`
  ${RowCSS}

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Column = styled.div`
  ${ColumnCSS}
`;

export const Header = styled.div`
  background-color: rgba(247, 247, 255, 0.5);
  padding: 3em 0;
  h5 {
    // font-size: 16px;
    font-weight: normal;
    margin-bottom: 0;
  }
  h1 {
    line-height: 1.5;
    //   font-size: ;
    font-weight: bolder;
  }
  h4 {
    font-weight: bold;
    color: rgba(0, 0, 0, 0.7);
  }

  ${Column}:last-of-type {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  @media screen and (max-width: 768px) {
    ${Column}:last-of-type {
      flex-direction: row;
      justify-content: center;

      align-items: flex-end;
    }
  }
`;

export const LogoSvg = styled.svg`
  width: 100%;
  height: auto;
  max-width: 300px;
`;

export const About = styled.section`
  padding: 40px 0;
`;

export const AboutContent = styled.p`
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.5);
`;

export const FeatureSection = styled.section`
  padding: 40px 0;
  background-color: #fbfcff;

  ${Column} {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  h2 {
    text-align: center;
  }
  h4 {
    color: rgba(0, 0, 0, 0.6);
    text-align: center;
    line-height: 1.5;
  }

  ${Column} p {
    text-align: center;
    margin: 0 50px;
    color: rgba(0, 0, 0, 0.75);
  }

  @media (max-width: 576px) {
    ${Row} {
      display: block;
    }
    ${Column} p {
      margin: 10px;
      padding: 0 20px;
    }
  }

  @media (max-width: 768px) {
    ${Row} {
      display: block;
    }
    ${Column} p {
      margin: 10px;
      padding: 0 20px;
    }
  }
`;

export const IconSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 50%;
  // height: 100px;
  // width: 100px;
  padding: 1em;
  box-shadow: 2px 2px 17px 0px rgba(50, 50, 50, 0.2);

  svg,
  img {
    height: 60px;
    width: 60px;
  }
`;

export const DocumentSection = styled.section`
  padding: 40px 0;
  background-color: rgba(247, 247, 247, 0.5);
  h4 {
    color: rgba(0, 0, 0, 0.6);
  }
`;
