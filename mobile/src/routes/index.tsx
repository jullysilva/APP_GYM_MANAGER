import React from "react";

import { InitialRoutes } from "./auth/auth.initial.routes";

import { useAuth } from "../contexts/useAuth";
import AppTabsRoutes from "./app/app.tabs.routes";

export function Routes() {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <AppTabsRoutes />;
  } else {
    return <InitialRoutes />;
  }
}
