import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";

import {
  FaBirthdayCake,
  FaTransgender,
  FaPhoneSquareAlt,
  FaEnvelope,
  FaLocationArrow,
  FaKey,
  FaStickyNote,
  FaMale,
  FaFemale,
  FaPencilAlt,
  FaTimes,
  FaUpload,
} from "react-icons/fa";

import Profile, { Navbar } from "../../components/Profile";
import { Container } from "../../globalStyles";
import ImageUpdate from "../../components/ImageUpdate";
import { Button } from "../../globalStyles";

export default function ProfilePage({ profile, editProfile }) {
  const [modalAvatar, setModalAvatar] = useState(false);
  const [modalCitizenship, setModalCitizenship] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [citizenship, setCitizenship] = useState(null);

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

  const onAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onCitizenshipChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setCitizenship(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleAvatar = (e) => {
    const profileImg = dataURItoBlob(avatar);
    const data = new FormData();
    data.append("image", profileImg, "avatar.png");
    editProfile(data);
    e.preventDefault();
  };

  const handleCitizenship = (e) => {
    const citImg = dataURItoBlob(citizenship);
    const data = new FormData();
    data.append("citizenship", citImg, "citizenship.png");
    editProfile(data);
    e.preventDefault();
  };

  const ImageUpdateModal = ({
    modal,
    setModal,
    image,
    handleSubmit,
    onChange,
  }) => (
    <ReactModal
      isOpen={!!modal}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <div className="content">
        <img src={image} alt="" />

        <div className="close" onClick={() => setModal(false)}>
          <FaTimes />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="controls">
          <div className="upload">
            <input
              type="file"
              onChange={onChange}
              placeholder="Citizenship Image"
              accept="image/*"
              id="avatar"
              style={{ display: "none" }}
            />
            <label htmlFor="avatar">
              <FaUpload />
            </label>
          </div>
          <Button primary>Save</Button>
          <Button danger onClick={() => setModal(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </ReactModal>
  );

  return (
    <Container style={{ marginBottom: "2rem" }}>
      <Profile>
        <Profile.Header>
          <Profile.AvatarSection>
            <Profile.Avatar src={profile.image} alt="avatar" />
            <div onClick={() => setModalAvatar(true)}>
              <FaPencilAlt />
            </div>
            <ImageUpdateModal
              modal={modalAvatar}
              setModal={setModalAvatar}
              image={avatar || profile.image}
              handleSubmit={handleAvatar}
              onChange={onAvatarChange}
            />
          </Profile.AvatarSection>
          <Profile.Info>
            <Profile.Name>
              {profile.first_name} {profile.last_name}{" "}
              {profile.is_voter ? (
                <Profile.VerifiedIcon />
              ) : (
                <Profile.UnverifiedIcon />
              )}
            </Profile.Name>
            <Profile.Id>Voter ID: {profile.id}</Profile.Id>
          </Profile.Info>
          <Profile.LoginInfo>{profile.last_login}</Profile.LoginInfo>
          <Profile.Edit>
            <Link to="/profile/edit">
              <Button black>Edit Profile</Button>
            </Link>
            <Link to="/user/change/password">Change Password</Link>
          </Profile.Edit>
        </Profile.Header>
        <Navbar>
          <Navbar.Nav>
            <Navbar.NavItem>
              <Navbar.NavLink>About</Navbar.NavLink>
            </Navbar.NavItem>
            <Navbar.NavItem>
              <Navbar.NavLink>Application</Navbar.NavLink>
            </Navbar.NavItem>
          </Navbar.Nav>
        </Navbar>
        <Profile.Detail>
          <Profile.PersonalInfo>
            <Profile.Heading>Profile Information</Profile.Heading>
            {/* DOB */}
            <Profile.InfoItem>
              <Profile.Icon>
                <FaBirthdayCake />
              </Profile.Icon>
              <Profile.ItemDetail>
                <Profile.ItemTitle>Date of Birth</Profile.ItemTitle>
                <Profile.ItemValue>{profile.dob}</Profile.ItemValue>
              </Profile.ItemDetail>
            </Profile.InfoItem>
            {/* Gender */}
            <Profile.InfoItem>
              <Profile.Icon>
                <FaTransgender />
              </Profile.Icon>
              <Profile.ItemDetail>
                <Profile.ItemTitle>Gender</Profile.ItemTitle>
                <Profile.ItemValue>{profile.gender}</Profile.ItemValue>
              </Profile.ItemDetail>
            </Profile.InfoItem>
            {/* Contact */}
            <Profile.InfoItem>
              <Profile.Icon>
                <FaPhoneSquareAlt />
              </Profile.Icon>
              <Profile.ItemDetail>
                <Profile.ItemTitle>Contact</Profile.ItemTitle>
                <Profile.ItemValue>+977 9844309479</Profile.ItemValue>
              </Profile.ItemDetail>
            </Profile.InfoItem>
            {/* Email */}
            <Profile.InfoItem>
              <Profile.Icon>
                <FaEnvelope />
              </Profile.Icon>
              <Profile.ItemDetail>
                <Profile.ItemTitle>Email</Profile.ItemTitle>
                <Profile.ItemValue>
                  admin.electionapp@gmail.com
                </Profile.ItemValue>
              </Profile.ItemDetail>
            </Profile.InfoItem>
            {/* Address */}
            <Profile.InfoItem>
              <Profile.Icon>
                <FaLocationArrow />
              </Profile.Icon>
              <Profile.ItemDetail>
                <Profile.ItemTitle>Permanent Address</Profile.ItemTitle>
                <Profile.ItemValue>
                  {profile.municipality}, {profile.district}
                </Profile.ItemValue>
              </Profile.ItemDetail>
            </Profile.InfoItem>
          </Profile.PersonalInfo>
          {/* Voting Detail */}
          <Profile.VotingInfo>
            <Profile.Heading>Voting Information</Profile.Heading>
            {/* Public Key */}
            <Profile.InfoItem>
              <Profile.Icon>
                <FaKey />
              </Profile.Icon>
              <Profile.ItemDetail>
                <Profile.ItemTitle>Public Key</Profile.ItemTitle>
                <Profile.ItemValue>
                  {profile.public_key ? profile.public_key : "Not Available"}
                </Profile.ItemValue>
              </Profile.ItemDetail>
            </Profile.InfoItem>

            {/* Status */}
            <Profile.InfoItem>
              <Profile.Icon>
                <FaStickyNote />
              </Profile.Icon>
              <Profile.ItemDetail>
                <Profile.ItemTitle>Status</Profile.ItemTitle>
                {profile.is_voter ? (
                  <Profile.Statusverified />
                ) : (
                  <Profile.StatusUnverified />
                )}
              </Profile.ItemDetail>
            </Profile.InfoItem>

            {/* Citizenship */}
            <Profile.InfoItem>
              <Profile.Icon>
                <FaStickyNote />
              </Profile.Icon>
              <Profile.ItemDetail>
                <Profile.ItemTitle>Citizenship</Profile.ItemTitle>
                <Profile.Citizenship src={profile.citizenship} alt="" />
                {profile.citizenship && (
                  <>
                    <div
                      onClick={() => setModalCitizenship(true)}
                      style={{ cursor: "pointer", color: "green" }}
                    >
                      <FaPencilAlt /> Edit
                    </div>
                    <ImageUpdateModal
                      modal={modalCitizenship}
                      setModal={setModalCitizenship}
                      image={citizenship || profile.citizenship}
                      handleSubmit={handleCitizenship}
                      onChange={onCitizenshipChange}
                    />
                  </>
                )}
              </Profile.ItemDetail>
            </Profile.InfoItem>
            {/* Father's Name */}
            <Profile.InfoItem>
              <Profile.Icon>
                <FaMale />
              </Profile.Icon>
              <Profile.ItemDetail>
                <Profile.ItemTitle>Father's Name</Profile.ItemTitle>
                <Profile.ItemValue>
                  {profile.father_name ? profile.father_name : "Not Found"}
                </Profile.ItemValue>
              </Profile.ItemDetail>
            </Profile.InfoItem>
            {/* Mother's Name */}
            <Profile.InfoItem>
              <Profile.Icon>
                <FaFemale />
              </Profile.Icon>
              <Profile.ItemDetail>
                <Profile.ItemTitle>Mother's Name</Profile.ItemTitle>
                <Profile.ItemValue>
                  {profile.mother_name ? profile.mother_name : "Not Found"}
                </Profile.ItemValue>
              </Profile.ItemDetail>
            </Profile.InfoItem>
          </Profile.VotingInfo>
        </Profile.Detail>
      </Profile>
    </Container>
  );
}
