import React from "react";

import { Wrapper, Radio, Label } from "./styles/radio";

export default function FancyInput({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
}

FancyInput.Radio = function RadioInput({ children, ...restProps }) {
  return (
    <Radio type="radio" {...restProps}>
      {children}
    </Radio>
  );
};

FancyInput.Label = function RadioLabel({ children, ...restProps }) {
  return <Label {...restProps}>{children}</Label>;
};
