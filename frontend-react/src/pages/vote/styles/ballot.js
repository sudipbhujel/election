import styled from "styled-components/macro";
import { Container } from "../../../globalStyles";

export const BallotContainer = styled.div`
  margin: 2em 0;
  //   padding: 2em 0;
  box-shadow: 2px 2px 17px 0px rgba(50, 50, 50, 0.2);
`;

export const Header = styled.section`
  text-align: center;
  background-color: #fbfbff;
  padding: 1em;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1em;
      height: 1em;
      margin-right: 0.2em;
    }
  }
  h2 {
    color: rgba(0, 0, 0, 0.8);
    font-size: 1em;
  }

  h4 {
    color: rgba(0, 0, 0, 0.8);
    text-align: right;
  }
`;

export const Info = styled.section`
  color: rgba(0, 0, 0, 0.8);
  margin: 1em;
  p {
    line-height: 1.4;
  }
`;

export const Main = styled.section`
  padding: 0 0 0.5em 0;
  h3 {
    margin: 0.5em 0 0.5em 1em;
  }
`;

export const Group = styled.div`
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #fbfbfb;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Column = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  //   margin: 1em 0;
  padding: 1em 1em;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Card = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 17px 0px rgba(50, 50, 50, 0.2);
  border-radius: 5px;
  padding: 0.5em;
  // margin-right: 2px;

  @media (max-width: 768px) {
    flex: 4;
  }
`;

export const Avatar = styled.div`
  img {
    object-fit: cover;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

export const CardInfo = styled.div`
  margin: 0.5em;
  h3 {
    color: #14274e;
    margin: 0.4em 0;
  }

  h4 {
    margin: 0.5em 0;
    color: #394867;
  }

  p {
    color: #9ba4b4;
  }
`;

export const Swastik = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  box-shadow: 2px 2px 17px 0px rgba(50, 50, 50, 0.1);
  // border: 1px solid rgba($color: #000000, $alpha: 0.2);
  height: 100px;
  cursor: pointer;
  border-radius: 5px;

  label {
    cursor: pointer;
    display: block;
    padding: 40%;
  }

  input[type="radio"] {
    display: none;
  }

  svg {
    display: none;
  }

  input[type="radio"]:checked ~ svg {
    display: inline;
    height: 100%;
    width: auto;
    padding: 0.5em;
  }

  input[type="radio"]:checked + label {
    display: none;
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const Submit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
`;
