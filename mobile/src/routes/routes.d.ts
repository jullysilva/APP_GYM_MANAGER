import { User } from "../@types/signIn.interface";

export type InitialRoutesParams = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AppRoutesParams = {
  HomeScreens: HomeRoutesParams;
  InfoScreens: InfoRoutesParams;
  ProfileScreens: ProfileRoutesParams;
  TrainerScreens: TrainerRoutesParams
};

export type TrainerRoutesParams = {
  Trainer: undefined;
  Student: User;
};

export type HomeRoutesParams = {
  Home: undefined;
};

export type ProfileRoutesParams = {
  Profile: undefined;
  ProfilePersonal: undefined;
  ProfilePersonalForm: undefined;
  ProfileFAQ: undefined;
  ProfileTerms: undefined;
  ProfilePolicy: undefined;
  ProfileWallet: undefined;
};

export type InfoRoutesParams = {
  Info: undefined;
  InfoTreino: undefined;
  InfoSaude: undefined;
  InfoSaudeForm: undefined;
  InfoSaudeUpdate: undefined;
};