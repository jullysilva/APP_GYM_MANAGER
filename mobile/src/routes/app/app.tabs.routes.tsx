import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import { HomeRoutes } from "./app.home.routes";
import { InfoRoutes } from "./app.info.routes";
import { TrainerRoutes } from "./app.trainer.routes";
import { ProfileRoutes } from "./app.profile.routes";

import { AppRoutesParams } from "../routes";

import theme from "../../utils/theme";

const colors = theme.colors;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParams>();
export default function AppTabsRoutes() {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.shape,
        tabBarInactiveTintColor: colors.fild,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: 80,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeScreens") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "TrainerScreens") {
            iconName = focused ? "id-card" : "id-card-o";
          } else if (route.name === "InfoScreens") {
            iconName = focused ? "tasks" : "tasks";
          } else if (route.name === "ProfileScreens") {
            iconName = focused ? "user-circle" : "user-circle-o";
          }
          //@ts-ignore
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      initialRouteName={"HomeScreens"}
    >
      <Screen name="HomeScreens" component={HomeRoutes} options={{}} />
      <Screen name="InfoScreens" component={InfoRoutes} />
      <Screen name="TrainerScreens" component={TrainerRoutes} />
      <Screen name="ProfileScreens" component={ProfileRoutes} />
    </Navigator>
  );
}
