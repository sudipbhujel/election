import React from "react";

import { ErrorContainer } from "./styles/error";

export default function Error({ children, ...restProps }) {
  return <ErrorContainer {...restProps}>{children}</ErrorContainer>;
}
