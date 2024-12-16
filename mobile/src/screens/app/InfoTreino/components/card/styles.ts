import { StyleSheet } from "react-native";
import theme from "../../../../../utils/theme";

export const styles = StyleSheet.create({
  card: {
    
    backgroundColor: theme.colors.fild,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: theme.colors.gray_400,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary_100,
    alignSelf: "center",
    marginBottom: 8,
   

  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  footer: {
    backgroundColor: theme.colors.primary_100,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  content: {
   
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 6
  }
});
