import React from "react";

import {
  SpinnerWrapper,
  SpinnerContainer,
  SpinnerText,
} from "./styles/spinner";

export default function Spinner({ color, size, sizeUnit, text }) {
  return (
    <SpinnerWrapper>
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
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "60%",
          zIndex: "1100",
          color: "#00bfff",
        }}
      >
        {text}
      </div>
      <SpinnerText color={color}>{text}</SpinnerText>
    </SpinnerWrapper>
  );
}

Spinner.defaultProps = {
  size: 64,
  color: "#00bfff",
  sizeUnit: "px",
  text: "Loading...",
};
