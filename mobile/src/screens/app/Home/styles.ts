import { StyleSheet } from "react-native";
import theme from "../../../utils/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.shape,
    
  },
  content: {
  
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    
    
  },
  title: {
    fontSize: theme.fonts.title,
    fontWeight: "bold",
    marginBottom: 20,
    color: theme.colors.title
  },
  subtitle: {
    fontSize: theme.fonts.subTitle,
    marginBottom: 10,
    color: theme.colors.gray_400
  },
  progressBarContainer: {
    width: "80%",
    height: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray_100,
    borderRadius: 10,
    overflow: "hidden"
  },
  progressBar: {
    height: "100%"
  },
  lotacaoText: {
    fontSize: theme.fonts.subTitle,
    fontWeight: "bold",
    color: theme.colors.text
  },
  bannerContainer: {
    width: '100%',
    height: '50%',
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '90%',
    height: '40%',
    borderRadius: 12,
    marginBottom: 10,
    
  },
  box: {
    height: '20%',
    
    flexDirection: "row",
    alignSelf: "center",
    
    alignItems: "center",
    
  },
  item: {
    backgroundColor: theme.colors.shape,
    width: 160,
    height: '90%',
    justifyContent:  "center",
    margin: 10,
    alignItems: "center",
    borderRadius: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }
  
});
