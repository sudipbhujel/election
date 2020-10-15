import styled from "styled-components/macro";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const ProfileContainer = styled.div`
  margin: 20px auto;
`;

export const Header = styled.section`
  display: flex;
  padding: 10px 0;
  box-shadow: 1px 1px 3px #ccc;

  @media (max-width: 576px) {
    display: block;
    text-align: center;
  }
`;

export const AvatarSection = styled.div`
  flex: 1;
  align-self: center;
  padding: 0 10px;
`;

export const Avatar = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 100px;
  width: 100px;
`;

export const Info = styled.div`
  flex: 2;
  align-self: center;
`;

export const Name = styled.h4`
  color: #50587a;
  font-size: 24px;
  font-weight: 550;
  padding: 4px 0;
  display: flex;

  @media (max-width: 576px) {
    display: block;
  }
`;

export const Id = styled.h5`
  color: #787e94;
  padding: 2px 0;
  font-weight: normal;
  font-size: 15px;
`;

export const LoginInfo = styled.div`
  flex: 3;
  align-self: center;
  color: #9ea5b9;
  border-left: 1px solid #eaeaea;
  padding-left: 10px;
`;

export const LoginInfoParagraph = styled.p`
  display: flex;
  margin: 16px 0;

  @media (max-width: 576px) {
    justify-content: center;
  }
`;

export const Edit = styled.div`
  flex: 2;
  align-self: center;
`;

export const Button = styled.button`
  padding: 10px;
  color: #ffffff;
  background-color: #383d43;
  border-radius: 5px;
  white-space: nowrap;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: #555555;
  }
`;

export const ProfileNavbar = styled.section`
  box-shadow: 1px 1px 3px #ccc;
`;

export const Nav = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  background-color: #f4f4f4;
`;

export const NavItem = styled.li`
  margin: 0;
  padding: 15px 10px;
`;

export const NavLink = styled.a`
  text-decoration: none;
  padding: 8px;
  color: #3b3738;
  cursor: pointer;
  &:active {
    border-bottom: 3px solid #74cc20;
  }
  //   &:focus {
  //     border-bottom: 3px solid #74cc20;
  //   }
  //   &:hover {
  //     background-color: red;
  //   }
`;

// Detail
export const Detail = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 10px;
  @media (max-width: 576px) {
    display: block;
  }
`;

export const Heading = styled.h4`
  line-height: 1.5;
  padding: 15px 30px;
`;

export const PersonalInfo = styled.div`
  border: 1px solid #eaeaea;
  flex: 2;
  margin-right: 20px;
  color: #4a5276;
  box-shadow: 1px 1px 2px #ccc;

  @media (max-width: 576px) {
    margin: 0 0 5px 0;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  border-top: 1px solid #eaeaea;
  padding-left: 20px;
  line-height: 2.4;

  @media (max-width: 576px) {
    border-top: none;
    &:first-of-type {
      border-top: 1px solid #eaeaea !important;
    }
  }
`;

export const ItemDetail = styled.div`
  width: 98%;
  overflow-x: auto;
`;

export const ItemValue = styled.div`
  overflow-x: auto;
`;

export const ItemTitle = styled.div`
  color: #7f849e;
`;

export const Icon = styled.div`
  padding: 0 10px;
  color: #7f849e;
`;

export const IconContainer = styled.p`
  margin-top: 2px;
`;

export const VotingInfo = styled.div`
  border: 1px solid #eaeaea;
  flex: 3;
  color: #4a5276;
  box-shadow: 1px 1px 2px #ccc;

  @media (max-width: 576px) {
    margin: 0 0 5px 0;
  }
`;

export const Citizenship = styled.img`
  /* object-fit: cover; */
  width: 98%;
  height: auto;
  padding-right: 10px;
`;

export const StatusUnverified = styled.button`
  color: #cf1b1b;
  background-color: #fff;
  border: 2px solid #cf1b1b; /* Green */
  padding: 2px 10px;
  border-radius: 30px;
`;

export const Statusverified = styled.button`
  color: #4caf50;
  background-color: #fff;
  border: 2px solid #4caf50; /* Green */
  padding: 2px 10px;
  border-radius: 30px;
  font-size: 16px;
`;

export const VerfiedIcon = styled(FaCheckCircle)`
  color: #4caf50;
  background-color: #fff;
  margin: auto 5px;
  font-size: 22px;
`;

export const UnverfiedIcon = styled(FaTimesCircle)`
  color: #cf1b1b;
  background-color: #fff;
  margin: auto 5px;
  font-size: 22px;
`;
