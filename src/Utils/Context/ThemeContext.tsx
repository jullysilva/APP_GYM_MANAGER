// ThemeContext.tsx

import { Theme } from "types/Theme";
import React, { createContext, useContext } from "react";

const ThemeContext = createContext<Theme | undefined>(undefined);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

type ThemeProviderProps = {
  theme: Theme;
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
