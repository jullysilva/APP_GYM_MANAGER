import React, { createContext, useContext, useState, ReactNode } from "react";
import { ILogin } from "Utils/Interfaces/Interface";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextData {
  userData: ILogin;
  getUser: () => ILogin;
  setUser: (userData: ILogin) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<ILogin>({} as ILogin);

  const setUser = (userData: ILogin) => {
    setUserData(userData);
  };

  const getUser = () => {
    return userData;
  };

  const logout = () => {
    setUserData({} as ILogin);
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
