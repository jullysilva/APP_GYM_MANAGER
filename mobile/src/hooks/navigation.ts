import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  AppRoutesParams,
  HomeRoutesParams,
  InitialRoutesParams,
  ProfileRoutesParams,
  InfoRoutesParams,
  TrainerRoutesParams
} from "../routes/routes";

export function useHomeNavigation() {
  const navigation = useNavigation<StackNavigationProp<HomeRoutesParams>>();
  return navigation;
}

export function useInitialNavigation() {
  const navigation = useNavigation<StackNavigationProp<InitialRoutesParams>>();
  return navigation;
}

export function useTabAPPNavigation() {
  const navigation = useNavigation<StackNavigationProp<AppRoutesParams>>();
  return navigation;
}

export function useProfileNavigation() {
  const navigation = useNavigation<StackNavigationProp<ProfileRoutesParams>>();
  return navigation;
}

export function useInfoNavigation() {
  const navigation = useNavigation<StackNavigationProp<InfoRoutesParams>>();
  return navigation;
}

export function useTrainerNavigation() {
  const navigation = useNavigation<StackNavigationProp<TrainerRoutesParams>>();
  return navigation;
}