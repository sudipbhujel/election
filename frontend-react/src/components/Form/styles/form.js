import styled from "styled-components/macro";

export const Container = styled.div`
  max-width: ${({ width }) => width};
  padding: 1em 3em 2em 3em;
  margin: 0em auto;
  background-color: #fff;
  border-radius: 4.2px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);
`;

export const Header = styled.h4`
  text-align: center;
  margin: 1rem 0;
  font-size: 20px;
`;

export const Subheader = styled.h5`
  margin: 0 15px;
  font-size: 18px;
  font-weight: normal;
`;

export const Group = styled.div`
  display: flex;
  @media (max-width: 576px) {
    display: block;
  }
`;

export const Row = styled.div`
  position: relative;
  flex: 1;
  margin: 15px;
`;

export const Icon = styled.i`
  position: absolute;
  top: 0.7em;
  left: 11px;
  padding-right: 11px;
  border-right: 2px solid #b9b9b9;
  font-size: large;
  color: #b9b9b9;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1em 0 1em 3.5em;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;

  &:focus {
    outline: 0;
    border-color: #64ac15;
    color: #383d43;
  }

  &:focus + ${Icon} {
    color: #7ed321;
    border-right: 2px solid #7ed321;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 1em 0 1em 3.5em;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;

  &:focus {
    outline: 0;
    border-color: #64ac15;
    color: #383d43;
  }

  &:focus + ${Icon} {
    color: #7ed321;
    border-right: 2px solid #7ed321;
  }
`;
