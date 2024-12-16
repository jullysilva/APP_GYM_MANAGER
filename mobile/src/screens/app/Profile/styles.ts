import { StyleSheet, Dimensions } from "react-native";

import theme from "../../../utils/theme";
const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: theme.colors.shape,
  },
  underlineProfile: {
    alignItems: "center",
    borderBottomWidth: 0.5,
    width: "80%",
  },

  bodyProfile: {
    alignItems: "center",
  },
  menuProfile: {
    height: "100%",
    width: width * 0.9,
    paddingTop: 20,
    marginHorizontal: 20,
  },
  underlineButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
