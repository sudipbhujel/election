import styled from "styled-components/macro";

export const Container = styled.div`
  max-width: ${({width})=>width};
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
  font-weight: bold;
`;

export const Field = styled.div`
  padding: 0.4rem;
`;

export const Label = styled.label`
  line-height: 2;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1em;
  line-height: 1.4;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;

  &:focus {
    outline: 0;
    border-color: #bfdeff;
  }
`;
