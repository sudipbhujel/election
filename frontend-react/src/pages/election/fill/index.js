import React from "react";

import ElectionForm from "./ElectionForm";

export default function FillFormPage(props) {
  return (
    <>
      <ElectionForm addProfile={props.addProfile} />
    </>
  );
}
