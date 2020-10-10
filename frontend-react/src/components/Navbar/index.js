import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "../../globalStyles";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink,
} from "./styles/navbar";
import logo from "../assets/logo.png";

export default function Navbar({ isAuthenticated, profile }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  console.log(isAuthenticated, profile);

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/" onClick={closeMobileMenu}>
          <NavIcon src={logo} />
          Election
        </NavLogo>
        <MobileIcon onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </MobileIcon>
        <NavMenu onClick={handleClick} click={click}>
          <NavItem>
            <NavLinks to="/" onClick={closeMobileMenu}>
              Home
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/parties" onClick={closeMobileMenu}>
              Parties
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/about" onClick={closeMobileMenu}>
              About
            </NavLinks>
          </NavItem>
          <NavItemBtn>
            {isAuthenticated ? (
              <p>Yes</p>
            ) : (<>
                {button ? (
                  <NavBtnLink to="/login">
                    <Button primary>Login</Button>
                  </NavBtnLink>
                ) : (
                  <NavBtnLink to="/login">
                    <Button onClick={closeMobileMenu} fontBig primary>
                      Login
                    </Button>
                  </NavBtnLink>
                )}
                </>
            )}
          </NavItemBtn>
        </NavMenu>
      </NavbarContainer>
    </Nav>
  );
}
