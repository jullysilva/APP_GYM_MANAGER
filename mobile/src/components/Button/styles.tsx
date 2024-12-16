import { StyleSheet, Dimensions } from "react-native";
import theme from "../../utils/theme";

const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  button: {
    marginVertical: 4,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: theme.colors.secundary,
    justifyContent: "center",
    width: width * 0.88,
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    color: "white",
    fontSize: 22,
  },
  buttonTransparent: {
    marginVertical: 4,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: theme.colors.secundary,
    borderWidth: 1,
    justifyContent: "center",
    width: width * 0.88,
    alignItems: "center",
    alignSelf: "center",
  },
  titleTransparent: {
    color: theme.colors.secundary,
    fontSize: 22,
  },
});
