import { StyleSheet, Dimensions } from "react-native";

import theme from "../../../utils/theme";
const { height, width } = Dimensions.get("window");
export const style = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: theme.colors.shape,
  },
  trainerName: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: theme.colors.shape,
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }
});
