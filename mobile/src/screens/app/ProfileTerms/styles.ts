import { StyleSheet, Dimensions } from "react-native";

import theme from "../../../utils/theme";
const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: theme.colors.shape,
  },
  text: {
    paddingHorizontal: 20,
    marginBottom: 20,
  }
});
