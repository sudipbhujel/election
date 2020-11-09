import React, { useEffect } from "react";
import { FaKey } from "react-icons/fa";

import { useHistory } from "react-router-dom";

import useAuths from "../../useAuth";

import { Form as FinalForm, Field } from "react-final-form";
import Form from "../../../../components/Form";
import { Container, Button } from "../../../../globalStyles";

const validate = (values) => {
  const errors = {};
  if (!values.new_password1) {
    errors.new_password1 = "Required";
  }
  if (!values.new_password2) {
    errors.new_password2 = "Required";
  }
  if (values.new_password1 !== values.new_password2) {
    errors.new_password2 = "Password not matched.";
  }
  return errors;
};

export default function UserPasswordResetConfirm(props) {
  const {
    reset,
    requestResetPasswordConfirmPost,
    requestResetPasswordConfirm,
  } = useAuths();

  const history = useHistory();

  useEffect(() => {
    requestResetPasswordConfirm({ uid: props.uid, token: props.token });
  }, []);

  useEffect(() => {
    if (reset.success) {
      history.push("/login");
    }
  }, [reset.success]);

  const onSubmit = (values) => {
    requestResetPasswordConfirmPost({
      uid: props.uid,
      token: props.token,
      new_password1: values.new_password1,
      new_password2: values.new_password2,
    });
  };
  return (
    <Container>
      {reset.status ? (
        <FinalForm
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <Form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
              <Form.Container width="40rem">
                <Form.Header>Reset Password Confirmation</Form.Header>

                <Form.Row>
                  <Field name="new_password1">
                    {({ input, meta }) => (
                      <>
                        <Form.Input
                          {...input}
                          validationFailed={meta.touched && meta.error}
                          type="password"
                          placeholder="New Password"
                        />
                        {meta.error && meta.touched && (
                          <Form.FieldError>{meta.error}</Form.FieldError>
                        )}
                      </>
                    )}
                  </Field>
                  <Form.Icon>
                    <FaKey />
                  </Form.Icon>
                </Form.Row>
                <Form.Row />
                <Form.Row>
                  <Field name="new_password2">
                    {({ input, meta }) => (
                      <>
                        <Form.Input
                          {...input}
                          validationFailed={meta.touched && meta.error}
                          type="password"
                          placeholder="Password Confirmation"
                        />
                        {meta.error && meta.touched && (
                          <Form.FieldError>{meta.error}</Form.FieldError>
                        )}
                      </>
                    )}
                  </Field>
                  <Form.Icon>
                    <FaKey />
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
      ) : (
        <h4>Link not valid.</h4>
      )}
    </Container>
  );
}
