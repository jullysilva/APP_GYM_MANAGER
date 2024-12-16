import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "Utils/Context/useAuth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useAuth();
  console.log("navigation", userData.token);

  return userData.token ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
