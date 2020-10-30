import React from "react";
import { Form as FinalForm, Field } from "react-final-form";

import {
  FaUser,
  FaMale,
  FaFemale,
  FaBirthdayCake,
  FaTransgender,
  FaLocationArrow,
  FaSearchLocation,
} from "react-icons/fa";

import Form from "../../../components/Form";
import { Button } from "../../../globalStyles";

const validate = (values) => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = "Required";
  }
  if (!values.last_name) {
    errors.last_name = "Required";
  }
  if (!values.gender) {
    errors.gender = "Required";
  }
  if (!values.dob) {
    errors.dob = "Required";
  }
  if (!values.father_name) {
    errors.father_name = "Required";
  }
  if (!values.mother_name) {
    errors.mother_name = "Required";
  }
  if (!values.citizenship_issued_district) {
    errors.citizenship_issued_district = "Required";
  }
  if (!values.province) {
    errors.province = "Required";
  }
  if (!values.district) {
    errors.district = "Required";
  }
  if (!values.municipality) {
    errors.municipality = "Required";
  }
  if (!values.ward) {
    errors.ward = "Required";
  } else if (isNaN(Number(values.ward))) {
    errors.ward = "Must be a number.";
  }
  if (!values.tole) {
    errors.tole = "Required";
  }
};

export default function ProfileEditForm({ profile, editProfile }) {
  const initialValues = {
    first_name: profile.first_name,
    last_name: profile.last_name,
    father_name: profile.father_name,
    mother_name: profile.mother_name,
    gender: profile.gender,
    dob: profile.dob,
    citizenship_issued_district: profile.citizenship_issued_district,
    province: profile.province,
    district: profile.district,
    municipality: profile.municipality,
    ward: profile.ward,
    tole: profile.tole,
  };

  const onSubmit = (values) => {
    const data = new FormData();
    for (let key in values) {
      data.append(key, values[key]);
    }
    try {
      editProfile(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Container width="55em">
            <Form.Header>Election Form</Form.Header>

            {/* Personal Information */}
            <Form.Subheader>Personal Information</Form.Subheader>
            <Form.Group>
              <Form.Row>
                <Field name="first_name">
                  {({ input, meta }) => (
                    <>
                      <Form.Input
                        {...input}
                        validationFailed={meta.touched && meta.error}
                        type="text"
                        placeholder="First Name"
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
              <Form.Row>
                <Field name="last_name">
                  {({ input, meta }) => (
                    <>
                      <Form.Input
                        validationFailed={meta.touched && meta.error}
                        {...input}
                        type="text"
                        placeholder="Last Name"
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
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Field name="father_name">
                  {({ input, meta }) => (
                    <>
                      <Form.Input
                        {...input}
                        validationFailed={meta.touched && meta.error}
                        type="text"
                        placeholder="Father's Name"
                      />
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaMale />
                </Form.Icon>
              </Form.Row>
              <Form.Row>
                <Field name="mother_name">
                  {({ input, meta }) => (
                    <>
                      <Form.Input
                        validationFailed={meta.touched && meta.error}
                        {...input}
                        type="text"
                        placeholder="Mother's Name"
                      />
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaFemale />
                </Form.Icon>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Field name="gender">
                  {({ input, meta }) => (
                    <>
                      <Form.Select
                        {...input}
                        validationFailed={meta.touched && meta.error}
                        type="text"
                        placeholder="Father's Name"
                      >
                        <option value="" disabled hidden>
                          Choose here
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaTransgender />
                </Form.Icon>
              </Form.Row>
              <Form.Row>
                <Field name="dob">
                  {({ input, meta }) => (
                    <>
                      <Form.Input
                        validationFailed={meta.touched && meta.error}
                        {...input}
                        type="date"
                        placeholder="Date of Birth"
                      />
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaBirthdayCake />
                </Form.Icon>
              </Form.Row>
            </Form.Group>

            <h6
              style={{ margin: "15px", fontWeight: "normal", fontSize: "16px" }}
            >
              Citizenship Issued District
            </h6>
            <Form.Group>
              <Form.Row>
                <Field name="citizenship_issued_district">
                  {({ input, meta }) => (
                    <>
                      <Form.Select
                        validationFailed={meta.touched && meta.error}
                        {...input}
                        type="text"
                        placeholder="Citizenship Issued District"
                      >
                        <option value="" disabled hidden>
                          Choose here
                        </option>
                        <option value="dolakha">Dolakha</option>
                        <option value="kathmandu">Kathmandu</option>
                      </Form.Select>
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaLocationArrow />
                </Form.Icon>
              </Form.Row>
              <Form.Row />
            </Form.Group>

            {/* Address Details */}
            <Form.Subheader>Address Details</Form.Subheader>
            <Form.Group>
              <Form.Row>
                <Field name="province">
                  {({ input, meta }) => (
                    <>
                      <Form.Select
                        {...input}
                        validationFailed={meta.touched && meta.error}
                        type="text"
                        placeholder="Province"
                      >
                        <option value="" disabled hidden>
                          Choose Province
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </Form.Select>
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaLocationArrow />
                </Form.Icon>
              </Form.Row>
              <Form.Row>
                <Field name="district">
                  {({ input, meta }) => (
                    <>
                      <Form.Select
                        validationFailed={meta.touched && meta.error}
                        {...input}
                        type="text"
                        placeholder="District"
                      >
                        <option value="" disabled hidden>
                          Choose District
                        </option>
                        <option value="dolakha">Dolakha</option>
                        <option value="kathmandu">Kathmandu</option>
                      </Form.Select>
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaLocationArrow />
                </Form.Icon>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Row>
                <Field name="municipality">
                  {({ input, meta }) => (
                    <>
                      <Form.Input
                        {...input}
                        validationFailed={meta.touched && meta.error}
                        type="text"
                        placeholder="Municipality"
                      />
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaLocationArrow />
                </Form.Icon>
              </Form.Row>
              <Form.Row>
                <Field name="ward">
                  {({ input, meta }) => (
                    <>
                      <Form.Input
                        validationFailed={meta.touched && meta.error}
                        {...input}
                        type="text"
                        placeholder="Ward No."
                      />
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaSearchLocation />
                </Form.Icon>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Field name="tole">
                  {({ input, meta }) => (
                    <>
                      <Form.Input
                        validationFailed={meta.touched && meta.error}
                        {...input}
                        type="text"
                        placeholder="Tole"
                      />
                      {meta.error && meta.touched && (
                        <Form.FieldError>{meta.error}</Form.FieldError>
                      )}
                    </>
                  )}
                </Field>
                <Form.Icon>
                  <FaSearchLocation />
                </Form.Icon>
              </Form.Row>
              <Form.Row />
            </Form.Group>

            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </Form.Container>
        </Form>
      )}
    />
  );
}
