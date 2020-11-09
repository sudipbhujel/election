import styled from "styled-components/macro";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const HeaderSection = styled.section`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 6px;
  box-shadow: 2px 2px 17px 0px rgba(50, 50, 50, 0.2);
`;

export const ImageSection = styled.div`
  padding: 0.5rem;
  flex: 1;

  img {
    object-fit: cover;
    width: 100%;
    min-width: 200px;
    max-width: 350px;
  }
`;

export const InfoSection = styled.div`
  flex: 2;
  color: rgba(0, 0, 0, 0.7);
  padding: 0.5rem;

  h2 {
    color: #1a1c20;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  h4 {
    font-weight: normal;
  }
`;

export const StatusSection = styled.div`
  flex: 1;
  padding: 0.5rem;
  color: rgba(0, 0, 0, 0.7);
  h4 {
    font-weight: normal;
  }
`;

export const Styles = styled.div`
  margin-bottom: 4rem;
  line-height: 2;
  h1 {
    margin-top: 0.67em;
    margin-bottom: 0.67em;
  }
  h2 {
    margin-top: 0.83em;
    margin-bottom: 0.83em;
  }
  h3 {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  h4 {
    margin-top: 1.33em;
    margin-bottom: 1.33em;
  }

  h5 {
    margin-top: 1.67em;
    margin-bottom: 1.67em;
  }

  h6 {
    margin-top: 2.33em;
    margin-bottom: 2.33em;
  }

  p {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  ul {
    margin-top: 1em;
    margin-bottom: 1 em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
  }
`;

export const VerfiedIcon = styled(FaCheckCircle)`
  color: #4caf50;
  background-color: #fff;
  margin: auto 5px;
  font-size: 22px;
`;

export const UnverfiedIcon = styled(FaTimesCircle)`
  color: #cf1b1b;
  background-color: #fff;
  margin: auto 5px;
  font-size: 22px;
`;
