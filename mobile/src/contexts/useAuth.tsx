import { createContext, useContext, useState, ReactNode } from "react";
import { CreditCard, HealthFile, StatusPayment, TrainingSheet, User } from "../@types/signIn.interface";


interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  userDataLogin: User;
  healthData: HealthFile;
  userTrainingSheet: TrainingSheet;
  setUserDataLogin: (userDataLogin: User) => void;
  setHealthData: (healthData: HealthFile) => void;
  setUserTrainingSheet: (userTrainingSheet: TrainingSheet) => void;

  createdCard: CreditCard;
  setCreatedCard: (createdCard: CreditCard) => void;

  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const [healthData, setHealthData] = useState<HealthFile>({
    id: '',
    name_personal_trainer: '',
    lesion: false,
    diabetes: false,
    surgery: false,
    hypertension: false,
    userId: '',
  });

  const [userTrainingSheet, setUserTrainingSheet] = useState<TrainingSheet>({} as TrainingSheet);

  const [userDataLogin, setUserDataLogin] = useState<User>({
    id: '',
    name: '',
    password: '',
    email: '',
    status: StatusPayment.PENDENTE,
    photo: '',
    active: true,
    cpf: '',
    isTrainer: false,
    cref: '',
    weight: 0,
    height: 0,
    firstAccess: true,
    phone: '',
    birth: '',
    gender: '',
    refresh_token: '',
    healthFile: healthData,
    trainingSheets: [],}
  );

  const [createdCard, setCreatedCard] = useState<CreditCard>({
    cvv: '',
    cardNumber: '',
    expiryDate: ''
  });

 
  const getIsLogged = () => {
    return isAuth;
  };

  const logout = () => {
    setIsAuth(false);
  };

  const login = () => {
    setIsAuth(true);
  };

  return (
    <AuthContext.Provider
      value={{
        userDataLogin,
        healthData,
        userTrainingSheet,
        createdCard,
        setCreatedCard,
        setUserDataLogin,
        setHealthData,
        setUserTrainingSheet,
        isAuth,
        setIsAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
