import React, { createContext, useContext, useState, ReactNode } from "react";

import { UserLogin } from "../Schemas";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextData {
  userData: UserLogin;
  getUser: ({ email, password }: UserLogin) => void;
  setUser: (userData: UserLogin) => void;
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
  return (
    <UserContext.Provider
      value={{
        userData,
        getUser,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function userHook(): UserContextData {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(UserContext);

  return context;
}
