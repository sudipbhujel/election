import React from "react";

import { Form as FinalForm, Field } from "react-final-form";
import { FaUser, FaEnvelope } from "react-icons/fa";

import useAuths from "../../useAuth";

import Form from "../../../../components/Form";
import { Container, Button } from "../../../../globalStyles";

const validate = (values) => {
  const errors = {};
  if (!values.citizenship_number) {
    errors.citizenship_number = "Required";
  } else if (isNaN(Number(values.citizenship_number))) {
    errors.citizenship_number = "Must be a number.";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

export default function UserResetPassword() {
  const { reset, requestResetPassword } = useAuths();
  const onSubmit = (values) => {
    let data = new FormData();
    data.append("citizenship_number", values.citizenship_number);
    data.append("email", values.email);
    requestResetPassword(data);
  };
  return (
    <Container>
      <FinalForm
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <Form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <Form.Container width="40rem">
              <Form.Header>Reset Password</Form.Header>

              <Form.Row>
                <Field name="citizenship_number">
                  {({ input, meta }) => (
                    <>
                      <Form.Input
                        {...input}
                        validationFailed={meta.touched && meta.error}
                        type="text"
                        placeholder="Citizenship Number"
                      />
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaUser />
                </Form.Icon>
              </Form.Row>
              <Form.Row />
              <Form.Row>
                <Field name="email">
                  {({ input, meta }) => (
                    <>
                      <Form.Input
                        {...input}
                        validationFailed={meta.touched && meta.error}
                        type="text"
                        placeholder="Email Address"
                      />
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaEnvelope />
                </Form.Icon>
              </Form.Row>
              <Form.Row />
              <Button type="submit" disabled={submitting} primary>
                Submit
              </Button>
            </Form.Container>
          </Form>
        )}
      />
    </Container>
  );
}
