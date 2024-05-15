import React from "react";
import { Navigate } from "react-router-dom";
import { userHook } from "../Utils/Context/useAuth";

const PrivateRoute = ({ children }) => {
  const { userData } = userHook();

  return userData.email ? children : <Navigate to="/" />;
};

export default PrivateRoute;
