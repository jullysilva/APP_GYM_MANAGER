import React from "react";
import ErrorBoundary from "./routes/components/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "Utils/Context/ThemeContext";
import { theme } from "Utils/Styles/Theme";
import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </ThemeProvider>
    </div>
  );
};

export default App;
