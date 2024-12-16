import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { ProfileRoutesParams } from "../routes";

import Profile from "../../screens/app/Profile";
import ProfilePersonal from "../../screens/app/ProfilePersonal";
import ProfilePersonalForm from "../../screens/app/ProfilePersonalForm";
import ProfileFAQ from "../../screens/app/ProfileFAQ";
import ProfileTerms from "../../screens/app/ProfileTerms";
import ProfilePolicy from "../../screens/app/ProfilePolicy";
import ProfileWallet from "../../screens/app/ProfileWallet";

import theme from "../../utils/theme";

const { Navigator, Screen } = createStackNavigator<ProfileRoutesParams>();

export function ProfileRoutes() {
  return (
    <Navigator
      initialRouteName={"Profile"}
      screenOptions={{
        headerShown: false,
        title: "Perfil",
        headerStyle: {},
        headerTintColor: theme.colors.title,
      }}
    >
      <Screen name="Profile" component={Profile} />
      <Screen name="ProfilePersonal" component={ProfilePersonal} />
      <Screen name="ProfilePersonalForm" component={ProfilePersonalForm} />
      <Screen name="ProfileFAQ" component={ProfileFAQ} />
      <Screen name="ProfileTerms" component={ProfileTerms} />
      <Screen name="ProfilePolicy" component={ProfilePolicy} />
      <Screen name="ProfileWallet" component={ProfileWallet} />
    </Navigator>
  );
}
