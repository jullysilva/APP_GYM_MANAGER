import { StyleSheet, Dimensions } from "react-native";

import theme from "../../../utils/theme";
const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.shape,
    
  },
  content: {
    width: '90%',
    alignSelf: "center",
    marginTop: 50,
  },


 
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: theme.colors.gray_400
  },
 
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});
