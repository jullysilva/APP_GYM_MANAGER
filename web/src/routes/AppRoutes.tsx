import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import {
  Application,
  ResetPassword,
  NotFound,
  Profile,
  Member,
  Exercise,
  Dashboard,
  TrainingSheet,
  Home,
} from "pages";
import { UserProvider } from "Utils/Context/useAuth";

const AppRoutes = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Application />} />
          <Route path="/resetarsenha" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />

          <Route
            path="/painel"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>
          <Route
            path="/alunos"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route index element={<Member />} />
          </Route>
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route index element={<Profile />} />
          </Route>
          <Route
            path="/exercicio"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route index element={<Exercise />} />
          </Route>
          <Route
            path="/fichadetreino"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route index element={<TrainingSheet />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default AppRoutes;
