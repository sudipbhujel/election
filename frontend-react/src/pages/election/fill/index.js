import React, { useState } from "react";
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
import { Container, Button } from "../../../globalStyles";

export default function FillFormPage({ addProfile }) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [profileImage, setProfileimage] = useState(null);
  const [gender, setGender] = useState("");
  const [citizenshipIssueddistrict, setCitizenshipissueddistrict] = useState(
    ""
  );
  const [dob, setDob] = useState("");
  const [fatherName, setFathername] = useState("");
  const [motherName, setMothername] = useState("");
  const [citizenshipImage, setCitizenshipimage] = useState(null);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [ward, setWard] = useState("");
  const [tole, setTole] = useState("");

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

  const handleClick = (event) => {
    event.preventDefault();
    console.log(
      firstName,
      lastName,
      profileImage,
      gender,
      dob,
      fatherName,
      motherName,
      citizenshipIssueddistrict,
      citizenshipImage,
      province,
      district,
      municipality,
      ward,
      tole
    );
    const data = new FormData();
    data.append("first_name", firstName);
    data.append("last_name", lastName);
    data.append("image", profileImage);
    data.append("gender", gender);
    data.append("dob", dob);
    data.append("father_name", fatherName);
    data.append("mother_name", motherName);
    data.append("citizenship_issued_district", citizenshipIssueddistrict);
    data.append("citizenship", citizenshipImage);
    data.append("province", province);
    data.append("district", district);
    data.append("municipality", municipality);
    data.append("ward", ward);
    data.append("tole", tole);
    // addProfile(data);
  };
  return (
    <Container>
      <Form>
        <Form.Container width="55em">
          <Form.Header>Election Form</Form.Header>

          {/* Personal Information */}
          <Form.Subheader>Personal Information</Form.Subheader>
          <Form.Group>
            <Form.Row>
              <Form.Input
                type="text"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First Name"
              />
              <Form.Icon>
                <FaUser />
              </Form.Icon>
            </Form.Row>
            <Form.Row>
              <Form.Input
                type="text"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last Name"
              />
              <Form.Icon>
                <FaUser />
              </Form.Icon>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Input
                type="text"
                name="father_name"
                value={fatherName}
                onChange={(e) => setFathername(e.target.value)}
                placeholder="Father's name"
              />
              <Form.Icon>
                <FaMale />
              </Form.Icon>
            </Form.Row>
            <Form.Row>
              <Form.Input
                type="text"
                name="mother_name"
                value={motherName}
                onChange={(e) => setMothername(e.target.value)}
                placeholder="Mother's Name"
              />
              <Form.Icon>
                <FaFemale />
              </Form.Icon>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled hidden>
                  Choose here
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
              <Form.Icon>
                <FaTransgender />
              </Form.Icon>
            </Form.Row>
            <Form.Row>
              <Form.Input
                type="date"
                name="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Date of Birth"
              />
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
              <Form.Select
                value={citizenshipIssueddistrict}
                onChange={(e) => setCitizenshipissueddistrict(e.target.value)}
              >
                <option value="" disabled hidden>
                  Choose here
                </option>
                <option value="dolakha">Dolakha</option>
                <option value="kathmandu">Kathmandu</option>
              </Form.Select>
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
              <Form.Select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                <option value="" disabled hidden>
                  Choose Province
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Form.Select>
              <Form.Icon>
                <FaLocationArrow />
              </Form.Icon>
            </Form.Row>
            <Form.Row>
              <Form.Select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="" disabled hidden>
                  Choose District
                </option>
                <option value="dolakha">Dolakha</option>
                <option value="kathmandu">Kathmandu</option>
              </Form.Select>
              <Form.Icon>
                <FaLocationArrow />
              </Form.Icon>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Input
                type="text"
                name="municipality"
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                placeholder="Municipality"
              />
              <Form.Icon>
                <FaLocationArrow />
              </Form.Icon>
            </Form.Row>
            <Form.Row>
              <Form.Input
                type="text"
                name="ward"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                placeholder="Ward No."
              />
              <Form.Icon>
                <FaSearchLocation />
              </Form.Icon>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Input
                type="text"
                name="tole"
                value={tole}
                onChange={(e) => setTole(e.target.value)}
                placeholder="Tole"
              />
              <Form.Icon>
                <FaSearchLocation />
              </Form.Icon>
            </Form.Row>
            <Form.Row></Form.Row>
          </Form.Group>
          <Button
            primary
            style={{ display: " block", margin: "0 auto" }}
            onClick={(event) => handleClick(event)}
          >
            Submit
          </Button>
        </Form.Container>
      </Form>
    </Container>
  );
}
