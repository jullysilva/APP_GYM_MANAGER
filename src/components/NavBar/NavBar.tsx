import React from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  GiHamburgerMenuStyle,
  Icon,
  InputContainer,
  NavbarContainer,
  Navlink,
  Text,
} from "./NavBar.styled";

interface NavBarProps {
  handleMenuToggle: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ handleMenuToggle }) => {
  return (
    <>
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
