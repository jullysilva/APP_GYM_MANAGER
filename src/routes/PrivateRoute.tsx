import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "Utils/Context/useAuth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useAuth();

  return userData.email ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
