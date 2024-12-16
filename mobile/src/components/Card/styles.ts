import { StyleSheet, Dimensions } from "react-native";

import theme from "../../utils/theme";
const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.shape,
    padding: 20,
    borderRadius: 6,

    marginHorizontal: 10,
    marginVertical: 10,

    shadowColor: theme.colors.gray_400,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  textBox: {
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrow: {
    alignSelf: "center",
  },
});
