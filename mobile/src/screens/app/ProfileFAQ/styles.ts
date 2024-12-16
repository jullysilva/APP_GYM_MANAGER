import { StyleSheet, Dimensions } from "react-native";

import theme from "../../../utils/theme";
const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.shape,
  },
  textBox: {
    alignSelf: "center",
    paddingVertical: 8,
    width: width * 0.92,
    color: theme.colors.gray_800,
  },
});
