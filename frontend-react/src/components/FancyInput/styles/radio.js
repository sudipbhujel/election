import styled from "styled-components/macro";

// cc-selector
export const Wrapper = styled.div``;

export const Label = styled.label`
  background-image: url(${({ src }) => src});
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
  width: 350px;
  height: 200px;
  -webkit-transition: all 100ms ease-in;
  -moz-transition: all 100ms ease-in;
  transition: all 100ms ease-in;
  -webkit-filter: brightness(1.8) grayscale(1) opacity(0.7);
  -moz-filter: brightness(1.8) grayscale(1) opacity(0.7);
  filter: brightness(1.8) grayscale(1) opacity(0.7);

  &:hover {
    -webkit-filter: brightness(1.2) grayscale(0.5) opacity(0.9);
    -moz-filter: brightness(1.2) grayscale(0.5) opacity(0.9);
    filter: brightness(1.2) grayscale(0.5) opacity(0.9);
  }
`;

export const Radio = styled.input`
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:active & {
    + ${Label} {
      opacity: 0.9;
    }
  }

  &:checked {
    & + ${Label} {
      -webkit-filter: none;
      -moz-filter: none;
      filter: none;
    }
  }
`;
