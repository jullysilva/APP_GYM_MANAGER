import { StyleSheet, Dimensions } from "react-native";

import theme from "../../../utils/theme";
const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.shape,
  },

  bodyProfile: {
    alignItems: "center",
    marginTop: 20,
  },
  menuProfile: {
    margin: 24,
    backgroundColor: theme.colors.shape,
    padding: 20,
    borderRadius: 8,
    shadowColor: theme.colors.gray_400,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 8,
  },
 
 
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.secundary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: theme.colors.shape,
    fontSize: 16,
    fontWeight: "bold"
  }
});
