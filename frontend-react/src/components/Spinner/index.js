import React from "react";

import { SpinnerContainer } from "./styles/spinner";

export default function Spinner({ color, size, sizeUnit }) {
  return (
    <SpinnerContainer color={color} size={size} sizeUnit={sizeUnit}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </SpinnerContainer>
  );
}

Spinner.defaultProps = {
  size: 64,
  color: "#00bfff",
  sizeUnit: "px",
};
