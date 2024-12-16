import React, { useState } from "react";
import { View, ScrollView, Text, Alert, TouchableOpacity } from "react-native";
import { Appbar, Card } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import { styles } from "./styles";
import { useProfileNavigation } from "../../../hooks/navigation";
import { format } from "date-fns";
import { useAuth } from "../../../contexts/useAuth";
import Button from "../../../components/Button";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../../../utils/theme";

export default function ProfileWallet() {
  const navigation = useProfileNavigation();
  const { userDataLogin, createdCard, setCreatedCard } = useAuth();
  const user = {
    paymentStatus: userDataLogin.status,
    nextDueDate: new Date(2024, 6, 30),
  };

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

 
  

  const today = format(new Date(), "dd/MM/yyyy");
  const nextDueDate = format(user.nextDueDate, "dd/MM/yyyy");

  const validateExpiryDate = (date: string) => {
    const [month, year] = date.split("/").map(Number);
    if (month > 12 || year < 24) {
      return false;
    }
    return true;
  };

  const handleAddCard = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    
    if (!validateExpiryDate(expiryDate)) {
      Alert.alert("Erro", "Data de validade inválida.");
      return;
    }

    setCreatedCard({ cardNumber, expiryDate, cvv });
    Alert.alert("Cartão Criado", "Seu cartão foi adicionado com sucesso!");
    
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Carteira" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
       
        <Card style={styles.card}>
          <Card.Title title={`Hoje: ${today}`} />
          <Card.Content>
            <Text style={styles.statusText}>
              Status de Pagamento: {user.paymentStatus}
            </Text>
          </Card.Content>
        </Card>

        
        <View style={styles.nextDueDateContainer}>
          <Text style={styles.nextDueDateTitle}>Próxima Data de Vencimento</Text>
          <Text style={styles.nextDueDate}>{nextDueDate}</Text>
        </View>

        {createdCard.cardNumber && (
          <TouchableOpacity>
          <Card style={styles.creditCard}>
            <Card.Title  title={userDataLogin.name || 'Meu cartão'} >
              <Text></Text>
            </Card.Title>
            <Card.Content>
              <Text style={styles.cardNumber}>{createdCard.cardNumber}</Text>
              <View style={styles.cardDetails}>
                <Text style={styles.cardDetail}>Validade: {createdCard.expiryDate}</Text>
                <Text style={styles.cardDetail}>CVV: {createdCard.cvv}</Text>
                <FontAwesome
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        name={"cc-visa"}
                        size={40}
                        color={theme.colors.gray_800}
                        style={{ paddingLeft:4, alignSelf: "flex-end"}}
                      /> 
              </View>
            </Card.Content>
          </Card>
          </TouchableOpacity>
        )}

       
        <Card style={styles.card}>
          <Card.Title title="Adicionar Cartão de Crédito" />
          <Card.Content>
            <TextInputMask
              type={"credit-card"}
              options={{
                obfuscated: false,
                issuer: 'visa-or-mastercard',
              }}
              value={cardNumber}
              onChangeText={(text) => setCardNumber(text)}
              style={styles.input}
              placeholder="Número do Cartão"
              keyboardType="numeric"
            />
            <TextInputMask
              type={"datetime"}
              options={{
                format: "MM/YY",
              }}
              value={expiryDate}
              onChangeText={(text) => setExpiryDate(text)}
              style={styles.input}
              placeholder="Data de Validade (MM/AA)"
              keyboardType="numeric"
            />
            <TextInputMask
              type={"custom"}
              options={{
                mask: "999",
              }}
              value={cvv}
              onChangeText={(text) => setCvv(text)}
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              
            />
            <Button title={createdCard.cardNumber ? "Atualizar cartão" : "Adicionar Cartão"}  onPress={handleAddCard} />
          </Card.Content>
        </Card>

       
        
      </ScrollView>
    </View>
  );
}