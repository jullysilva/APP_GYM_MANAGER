import React from "react";
import Sidebar from "components/Sidebar/Sidebar";
import NavBar from "components/NavBar/NavBar";
import { Container, SubContainer } from "./Home.styled";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Container>
      <Sidebar menuOpen={menuOpen} />
      <SubContainer>
        <NavBar handleMenuToggle={handleMenuToggle} />
        <Outlet />
      </SubContainer>
    </Container>
  );
};

export default Home;
