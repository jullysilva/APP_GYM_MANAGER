import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Home, Application, ResetPassword, NotFound, Profile } from "pages";
import { UserProvider } from "Utils/Context/useAuth";

const AppRoutes = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Application />} />
          <Route path="/resetarsenha" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
          {/* <PrivateRoute> */}
          <Route path="/painel" element={<Home />} />
          {/* <Route index element={<Dashboard />} /> */}
          {/* </Route> */}
          {/* <Route path="/alunos" element={<Home />}>
              <Route index element={<People />} />
            </Route> */}
          <Route path="/perfil" element={<Home />}>
            <Route index element={<Profile />} />
          </Route>
          {/* <Route path="/exercicio" element={<Home />}>
              <Route index element={<ExerciseItem />} />
            </Route>
            <Route path="/fichadetreino" element={<Home />}>
              <Route index element={<TrainingSheet />} />
            </Route> */}
          {/* </PrivateRoute> */}
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default AppRoutes;
