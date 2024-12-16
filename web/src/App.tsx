import ErrorBoundary from "./routes/components/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "Utils/Context/ThemeContext";
import { theme } from "Utils/Styles/Theme";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "./App.css";
import { UserProvider } from "Utils/Context/useAuth";

export const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBXSmeASOIvmEiw4tkTThwGUPedUtDWNJ4",
    authDomain: "hikeweb-44820.firebaseapp.com",
    projectId: "hikeweb-44820",
    storageBucket: "hikeweb-44820.appspot.com",
    messagingSenderId: "75156022176",
    appId: "1:75156022176:web:d188b72007a299009fbac5",
    measurementId: "G-WFD9HYMZTS",
  };

  const app = initializeApp(firebaseConfig);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const analytics = getAnalytics(app);

  return (
    <div className="App">
      <UserProvider>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </ThemeProvider>
      </UserProvider>
    </div>
  );
};

export default App;
