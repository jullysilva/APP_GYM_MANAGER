import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { InfoRoutesParams } from "../routes";

import Info from "../../screens/app/Info";
import InfoTreino from "../../screens/app/InfoTreino";
import InfoSaude from "../../screens/app/InfoSaude";
import InfoSaudeForm from "../../screens/app/InfoSaudeForm";
import InfoSaudeUpdate from "../../screens/app/InfoSaudeUpdate";

const { Navigator, Screen } = createStackNavigator<InfoRoutesParams>();

export function InfoRoutes() {
  return (
    <Navigator
      initialRouteName={"Info"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Info" component={Info} />
      <Screen name="InfoTreino" component={InfoTreino} />
      <Screen name="InfoSaude" component={InfoSaude} />
      <Screen name="InfoSaudeForm" component={InfoSaudeForm} />
      <Screen name="InfoSaudeUpdate" component={InfoSaudeUpdate} />
    </Navigator>
  );
}
