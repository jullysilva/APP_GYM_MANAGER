import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
  height: 10%;
  color: white;
  background-color: #091322;
`;

export const Text = styled.h4`
  color: #ffc60b;
  margin-right: 2vh;
  span {
    font-weight: 500;
    color: #484258;
  }
`;

export const InputContainer = styled.div`
  display: flex;
`;

export const Icon = styled.div`
  height: 3rem;
  width: 3rem;
  background-color: #dce4ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  svg {
    color: #555555;
  }
`;

export const Navlink = styled(NavLink)`
  color: #e4e4e4;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.1rem;
`;

export const GiHamburgerMenuStyle = styled(GiHamburgerMenu)`
  width: 30px;
  height: 30px;
  color: #ffc60b;
  cursor: pointer;

  &:hover {
    color: #c5c2b7;
  }
`;
