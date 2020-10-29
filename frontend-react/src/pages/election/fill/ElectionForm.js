import React, { useRef, useState } from "react";

import { Form as FinalForm, Field } from "react-final-form";

import {
  FaUser,
  FaMale,
  FaFemale,
  FaBirthdayCake,
  FaTransgender,
  FaFileImage,
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

  return errors;
};

export default function ElectionForm(props) {
  const [profileImage, setProfileimage] = useState(null);
  const [citizenshipImage, setCitizenshipimage] = useState(null);

  const onCitizenshipImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setCitizenshipimage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onProfileImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfileimage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  const onSubmit = (values) => {
    const profileIMG = dataURItoBlob(profileImage);
    const citizenshipIMG = dataURItoBlob(citizenshipImage);
    const data = new FormData();
    data.append("image", profileIMG, "avatar.png");
    data.append("citizenship", citizenshipIMG, "citizenship.png");
    for (let key in values) {
      data.append(key, values[key]);
    }
    try {
      props.addProfile(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
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

            <h6
              style={{ margin: "15px", fontWeight: "normal", fontSize: "16px" }}
            >
              Citizenship Image
            </h6>
            <Form.Group>
              <Form.Row>
                <Form.Input
                  type="file"
                  onChange={onCitizenshipImageChange}
                  placeholder="Citizenship Image"
                />
                <Form.Image src={citizenshipImage} />
                <Form.Icon>
                  <FaFileImage />
                </Form.Icon>
              </Form.Row>
              <Form.Row />
            </Form.Group>
            <h6
              style={{ margin: "15px", fontWeight: "normal", fontSize: "16px" }}
            >
              Profile Image
            </h6>
            <Form.Group>
              <Form.Row>
                <Form.Input
                  type="file"
                  onChange={onProfileImageChange}
                  placeholder="Profile Image"
                />
                <Form.Image src={profileImage} />
                <Form.Icon>
                  <FaFileImage />
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
