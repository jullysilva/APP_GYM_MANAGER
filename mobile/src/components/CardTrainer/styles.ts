import { StyleSheet, Dimensions } from "react-native";

import theme from "../../utils/theme";
const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.smoke,

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
    flexDirection: "column",
  },
  arrow: {
    alignSelf: "center",
  },
  content: {
    margin: 20,
    flexDirection: "row",
    gap: 32,
  },
  footer: {
    backgroundColor: theme.colors.primary_100,
    height: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
