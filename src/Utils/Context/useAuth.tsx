import React, { createContext, useContext, useState, ReactNode } from "react";

import { UserLogin } from "../Schemas";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextData {
  userData: UserLogin;
  getUser: () => UserLogin;
  setUser: (userData: UserLogin) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<UserLogin>({} as UserLogin);

  const setUser = (userData: UserLogin) => {
    setUserData(userData);
  };

  const getUser = () => {
    return userData;
  };

  const logout = () => {
    setUserData({} as UserLogin);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        getUser,
        setUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useAuth(): UserContextData {
  const context = useContext(UserContext);
  return context;
}
