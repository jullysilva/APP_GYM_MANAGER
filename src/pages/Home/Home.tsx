import Sidebar from "components/Sidebar/Sidebar";
import NavBar from "components/NavBar/NavBar";
import { Container, SubContainer } from "./Home.styled";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Container>
      {/* <Sidebar /> */}
      <SubContainer>
        <NavBar />
        <Outlet />
      </SubContainer>
    </Container>
  );
};

export default Home;
