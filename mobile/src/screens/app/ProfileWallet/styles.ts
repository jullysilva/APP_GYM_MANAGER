import { StyleSheet, Dimensions } from "react-native";

import theme from "../../../utils/theme";

export const styles  = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  statusText: {
    fontSize: 16,
    color: "#333",
  },
  nextDueDateContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  nextDueDateTitle: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 8,
    alignSelf: "center"
  },
  nextDueDate: {
    fontSize: 16,
    color: "#333",
    alignSelf: "center"
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333"
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  cardDetail: {
    fontSize: 14,
    paddingRight: 4,
    color: "#333",
  },
  creditCard: {
    backgroundColor: theme.colors.yellow,
    marginBottom: 16,
    padding: 16,
    width: "90%",
    alignSelf:"center"
  }
})