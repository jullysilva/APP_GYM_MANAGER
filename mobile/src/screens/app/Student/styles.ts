import { StyleSheet, Dimensions } from "react-native";

import theme from "../../../utils/theme";
const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.shape,
  },

  bodyProfile: {
    alignItems: "center",
    marginTop: 20,
  },
  menuProfile: {
    margin: 20,
    backgroundColor: theme.colors.smoke,
    padding: 16,
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
    marginBottom: 10,
    color: theme.colors.gray_400
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
  },

  noExercisesText: {
    fontSize: 14,
    color: theme.colors.success,
    textAlign: "center",
    marginTop: 16,
  },
  noTrainingSheetText: {
    fontSize: 14,
    color: theme.colors.danger,
    textAlign: "center",
    marginTop: 16,
  },
});
