import React from "react";
import { MdError } from "react-icons/md";

import {
  Container,
  Header,
  Group,
  Row,
  Input,
  Icon,
  Subheader,
  Select,
  Image,
  FieldError
} from "./styles/form";

export default function Form({ children, ...restProps }) {
  return <form {...restProps}>{children}</form>;
}

Form.Container = function FormContainer({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Form.Header = function FormHeader({ children, ...restProps }) {
  return <Header {...restProps}>{children}</Header>;
};

Form.Subheader = function FormSubheader({ children, ...restProps }) {
  return <Subheader {...restProps}>{children}</Subheader>;
};

Form.Group = function FormGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Form.Row = function FormRow({ children, ...restProps }) {
  return <Row {...restProps}>{children}</Row>;
};

Form.Input = function FormInput({ ...restProps }) {
  return <Input {...restProps} />;
};

Form.Select = function FormSelect({ children, ...restProps }) {
  return <Select {...restProps}>{children}</Select>;
};

Form.Icon = function FormIcon({ children, ...restProps }) {
  return <Icon {...restProps}>{children}</Icon>;
};

Form.Image = function FormImage({ children, ...restProps }) {
  return <Image {...restProps}>{children}</Image>;
};

Form.FieldError = function FormFieldError({ children, ...restProps }) {
  return <FieldError {...restProps}>&nbsp;&nbsp;<MdError />{children}</FieldError>;
};
