import React from "react";

import { WebcamContainer, Image } from "./styles/webcam";

export default function Webcam({ children, ...restProps }) {
  return <WebcamContainer {...restProps}>{children}</WebcamContainer>;
}

Webcam.Image = function WebcamImage({ ...restProps }) {
  return <Image {...restProps} />;
};
