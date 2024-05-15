import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  GiHamburgerMenuStyle,
  Icon,
  InputContainer,
  NavbarContainer,
  Navlink,
  Text,
} from "./NavBar.styled";
import Sidebar from "components/Sidebar/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Sidebar menuOpen={menuOpen} />
      <NavbarContainer>
        <GiHamburgerMenuStyle onClick={handleMenuToggle} />
        <Text>Gerente</Text>
        <Navlink to={"/perfil"}>
          <InputContainer>
            <Icon data-testid="account-icon">
              <FaUserCircle />
            </Icon>
          </InputContainer>
        </Navlink>
      </NavbarContainer>
    </>
  );
};

export default NavBar;
