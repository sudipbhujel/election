import React, { useRef, useState } from "react";

import { Form as FinalForm, Field } from "react-final-form";

import { FaUser, FaKey } from "react-icons/fa";

import Form from "../../components/Form";
import Webcam from "../../components/Webcam";
import { Video, Canvas } from "../../components/Webcam/styles/webcam";
import { Button } from "../../globalStyles";
import useAuths from "./useAuths";

const validate = (values) => {
  const errors = {};
  if (!values.citizenship_number) {
    errors.citizenship_number = "Required";
  } else if (isNaN(Number(values.citizenship_number))) {
    errors.citizenship_number = "Must be a number.";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

export default function LoginForm({ children }) {
  const nextButton = useRef(null);
  const video = useRef(null);
  const canvas = useRef(null);
  const snapButton = useRef(null);
  const submitButton = useRef(null);

  const [context, setContext] = useState(null);
  const [image, setImage] = useState(null);

  const { addAuthToken } = useAuths();

  const next = (e) => {
    e.preventDefault();
    // Styles
    video.current.style.removeProperty("display");
    nextButton.current.style.display = "none";
    snapButton.current.style.removeProperty("display");
    video.current.classList.add("video");

    const constraints = {
      video: true,
      audio: false,
    };

    setContext(canvas.current.getContext("2d"));
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);
    }

    function handleSuccess(stream) {
      video.current.srcObject = stream;
      video.current.play();
    }

    function handleError(e) {
      alert(e.name);
    }
  };

  const snap = (e) => {
    e.preventDefault();
    submitButton.current.style.removeProperty("display");
    canvas.current.width = video.current.clientWidth;
    canvas.current.height = video.current.clientHeight;
    snapButton.current.innerText = "Retake";
    context.drawImage(
      video.current,
      0,
      0,
      canvas.current.width,
      canvas.current.height
    );
    setImage(canvas.current.toDataURL());
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

  function stopStreamedVideo(videoElem) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });
    videoElem.srcObject = null;
  }

  const onSubmit = (values) => {
    console.log(image)
    let file = dataURItoBlob(image);
    const data = new FormData();
    data.append("face_image", file, "avatar.png");
    for (let key in values) {
      data.append(key, values[key]);
    }
    try {
      addAuthToken(data);
    } catch (err) {
      console.log(err);
    }
    stopStreamedVideo(video.current);
  };

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Container width="40rem">
            {children}
            <Form.Header>Login</Form.Header>
            <Form.Group>
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
              <Form.Row>
                <Field name="password">
                  {({ input, meta }) => (
                    <>
                      <Form.Input
                        validationFailed={meta.touched && meta.error}
                        {...input}
                        type="password"
                        placeholder="Password"
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
            </Form.Group>

            <Form.Row>
              <Webcam>
                <Video ref={video} style={{ display: "none" }} />
                <Canvas ref={canvas} hidden />
                <Webcam.Image src={image} width="300px" />
                <Button ref={nextButton} onClick={next}>
                  Next
                </Button>
                <Button
                  ref={snapButton}
                  onClick={snap}
                  style={{ display: "none" }}
                >
                  Snap
                </Button>
              </Webcam>
            </Form.Row>

            <Button
              ref={submitButton}
              type="submit"
              disabled={submitting}
              style={{ display: "none" }}
            >
              Submit
            </Button>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </Form.Container>
        </Form>
      )}
    />
  );
}
