import { StyleSheet, Dimensions } from "react-native";
import theme from "../../../../../utils/theme";

const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  arrow: {
    alignSelf: "center",
  },

  buttonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomColor: theme.colors.gray_100,
    borderBottomWidth: 0.8,
  },
  underlineButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
