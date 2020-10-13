import React from "react";

import { FaHistory, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import {
  ProfileContainer,
  Header,
  AvatarSection,
  Avatar,
  Info,
  LoginInfo,
  Edit,
  Button,
  Name,
  Id,
  ProfileNavbar,
  Nav,
  NavItem,
  NavLink,
  Detail,
  PersonalInfo,
  InfoItem,
  VotingInfo,
  Heading,
  Icon,
  IconContainer,
  ItemTitle,
  ItemDetail,
  ItemValue,
  LoginInfoParagraph,
  Citizenship,
  StatusUnverified,
  Statusverified,
  VerfiedIcon,
  UnverfiedIcon,
} from "./styles/profile";

export default function Profile({ children, ...restProps }) {
  return <ProfileContainer {...restProps}>{children}</ProfileContainer>;
}

Profile.Header = function ProfileCardHeader({ children, ...restProps }) {
  return <Header {...restProps}>{children}</Header>;
};

Profile.AvatarSection = function ProfileAvatarSection({
  children,
  ...restProps
}) {
  return <AvatarSection {...restProps}>{children}</AvatarSection>;
};

Profile.Avatar = function ProfileAvatar({ children, ...restProps }) {
  return <Avatar {...restProps}>{children}</Avatar>;
};

Profile.Info = function ProfileInfo({ children, ...restProps }) {
  return <Info {...restProps}>{children}</Info>;
};

Profile.Name = function ProfileName({ children, ...restProps }) {
  return <Name {...restProps}>{children}</Name>;
};

Profile.Id = function ProfileId({ children, ...restProps }) {
  return <Id {...restProps}>{children}</Id>;
};

Profile.LoginInfo = function ProfileLoginInfo({ children, ...restProps }) {
  return (
    <LoginInfo {...restProps}>
      <LoginInfoParagraph>
        <FaHistory />
        &nbsp; Last Login: <span style={{ color: "#4a5276" }}>{children}</span>
      </LoginInfoParagraph>
    </LoginInfo>
  );
};

Profile.Edit = function ProfileEdit({ children, ...restProps }) {
  return <Edit {...restProps}>{children}</Edit>;
};

Profile.Button = function ProfileButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

export function Navbar({ children, ...restProps }) {
  return <ProfileNavbar {...restProps}>{children}</ProfileNavbar>;
}

Navbar.Nav = function NavbarNav({ children, ...restProps }) {
  return <Nav {...restProps}>{children}</Nav>;
};

Navbar.NavItem = function NavbarNavItem({ children, ...restProps }) {
  return <NavItem {...restProps}>{children}</NavItem>;
};

Navbar.NavLink = function NavbarNavLink({ children, ...restProps }) {
  return <NavLink {...restProps}>{children}</NavLink>;
};

Profile.Detail = function ProfileDetail({ children, ...restProps }) {
  return <Detail {...restProps}>{children}</Detail>;
};

Profile.Heading = function ProfileHeading({ children, ...restProps }) {
  return <Heading {...restProps}>{children}</Heading>;
};

Profile.PersonalInfo = function ProfilePersonalInfo({
  children,
  ...restProps
}) {
  return <PersonalInfo {...restProps}>{children}</PersonalInfo>;
};

Profile.InfoItem = function ProfileInfoItem({ children, ...restProps }) {
  return <InfoItem {...restProps}>{children}</InfoItem>;
};

Profile.ItemDetail = function ProfileItemDetail({ children, ...restProps }) {
  return <ItemDetail {...restProps}>{children}</ItemDetail>;
};

Profile.ItemTitle = function ProfileItemTitle({ children, ...restProps }) {
  return <ItemTitle {...restProps}>{children}</ItemTitle>;
};

Profile.ItemValue = function ProfileItemValue({ children, ...restProps }) {
  return <ItemValue {...restProps}>{children}</ItemValue>;
};

Profile.Icon = function ProfileIcon({ children, ...restProps }) {
  return (
    <Icon {...restProps}>
      <IconContainer>{children}</IconContainer>
    </Icon>
  );
};

Profile.VotingInfo = function ProfileVotingInfo({ children, ...restProps }) {
  return <VotingInfo {...restProps}>{children}</VotingInfo>;
};

Profile.Citizenship = function ProfileCitizenship({ children, ...restProps }) {
  return <Citizenship {...restProps}>{children}</Citizenship>;
};

Profile.StatusUnverified = function ProfileStatusUnverified({
  children,
  ...restProps
}) {
  return (
    <StatusUnverified {...restProps}>
      <FaTimesCircle /> Unverified
    </StatusUnverified>
  );
};

Profile.Statusverified = function ProfileStatusverified({
  children,
  ...restProps
}) {
  return (
    <Statusverified {...restProps}>
      <FaCheckCircle /> Verified
    </Statusverified>
  );
};

Profile.VerifiedIcon = function ProfileVerifiedIcon({
  children,
  ...restProps
}) {
  return <VerfiedIcon {...restProps}>{children}</VerfiedIcon>;
};

Profile.UnverifiedIcon = function ProfileUnverifiedIcon({
  children,
  ...restProps
}) {
  return <UnverfiedIcon {...restProps}>{children}</UnverfiedIcon>;
};
