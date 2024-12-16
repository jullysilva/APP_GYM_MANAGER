import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { InitialRoutesParams } from "../routes";

import SignIn from "../../screens/auth/SignIn";
import SignUp from "../../screens/auth/SignUp";



const { Navigator, Screen } = createStackNavigator<InitialRoutesParams>();

export function InitialRoutes() {
  return (
    <Navigator
      initialRouteName={"SignIn"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}
