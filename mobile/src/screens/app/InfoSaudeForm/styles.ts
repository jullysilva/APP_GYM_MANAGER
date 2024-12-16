import { StyleSheet } from "react-native";
import theme from "../../../utils/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.shape,
  },
  card: {
    backgroundColor: theme.colors.shape,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.title,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
  },
});
