import React from "react";
import { Link } from "react-router-dom";

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
} from "react-icons/fa";

import Profile, { Navbar } from "../../components/Profile";
import { Container } from "../../globalStyles";

export default function ProfilePage({ profile }) {
  return (
    <Container>
      <Profile>
        <Profile.Header>
          <Profile.AvatarSection>
            <Profile.Avatar src={profile.image} alt="avatar" />
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
              <Profile.Button>Edit Profile</Profile.Button>
            </Link>
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
