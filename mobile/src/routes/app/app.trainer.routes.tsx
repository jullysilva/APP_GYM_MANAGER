import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { TrainerRoutesParams } from "../routes";

import Trainer from "../../screens/app/Trainer";
import Student from "../../screens/app/Student";

import theme from "../../utils/theme";

const { Navigator, Screen } = createStackNavigator<TrainerRoutesParams>();

export function TrainerRoutes() {
  return (
    <Navigator
      initialRouteName={"Trainer"}
      screenOptions={{
        headerShown: false,
        title: "Perfil",
        headerStyle: {},
        headerTintColor: theme.colors.title,
      }}
    >
      <Screen name="Trainer" component={Trainer} />
      <Screen name="Student" component={Student} />
      
    </Navigator>
  );
}
