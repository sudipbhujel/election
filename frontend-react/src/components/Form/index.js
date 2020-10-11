import React from "react";

import { Container, Field, Label, Input, Header } from "./styles/form";

export default function Form({ children, ...restProps }) {
  return <form {...restProps}>{children}</form>;
}

Form.Container = function FormContainer({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Form.Header = function FormHeader({ children, ...restProps }) {
  return <Header {...restProps}>{children}</Header>;
};

Form.Field = function FormField({ children, ...restProps }) {
  return <Field {...restProps}>{children}</Field>;
};

Form.Label = function FormLabel({ children, ...restProps }) {
  return <Label {...restProps}>{children}</Label>;
};

Form.Input = function FormInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};
