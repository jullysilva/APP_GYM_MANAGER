import React, { useState } from "react";
import { View, SafeAreaView, TextInput, Text, Alert, ScrollView } from "react-native";

import { Picker } from "@react-native-picker/picker";

import theme from "../../../utils/theme";
import { styles } from "./styles";
import Header from "../../../components/Header";
import { createHealthFile } from "../../../services/health";
import Button from "../../../components/Button";
import { useAuth } from "../../../contexts/useAuth";
import { HealthFile } from "../../../@types/signIn.interface";
import { updateUser } from "../../../services/user";
import { useInfoNavigation } from "../../../hooks/navigation";

export default function InfoSaudeForm() {
  const [namePersonalTrainer, setNamePersonalTrainer] = useState("");
  const [lesion, setLesion] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [surgery, setSurgery] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const navigation = useInfoNavigation();

  const { healthData, setHealthData , userDataLogin, setUserDataLogin} = useAuth();
  
  async function handleSubmit() {
    try {
      const newHealthFile: Omit<HealthFile, 'id'> = {
        name_personal_trainer: namePersonalTrainer,
        lesion,
        diabetes,
        surgery,
        hypertension,
        userId: userDataLogin.id,
      };
  
      const createdHealthFile: HealthFile = await createHealthFile(newHealthFile);
      
      setHealthData(createdHealthFile);

      const updatedFields = { healthFileId: createdHealthFile.id };
      const newDataUser = await updateUser(userDataLogin.id, updatedFields);

      setUserDataLogin(newDataUser);

  
      Alert.alert("Sucesso", "Ficha de saúde criada com sucesso", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Info"), 
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a ficha de saúde", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Info"), 
        },
      ]);
    }
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <ScrollView style={styles.container}>
        <Header title="Criar Ficha de Saúde" />
        <View style={styles.card}>
          <Text style={styles.label}>Nome do Personal Trainer</Text>
          <TextInput
            style={styles.input}
            value={namePersonalTrainer}
            onChangeText={setNamePersonalTrainer}
          />
          <Text style={styles.label}>Lesão</Text>
          <Picker
            selectedValue={lesion}
            onValueChange={(itemValue) => setLesion(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Não" value={false} />
            <Picker.Item label="Sim" value={true} />
          </Picker>
          <Text style={styles.label}>Diabetes</Text>
          <Picker
            selectedValue={diabetes}
            onValueChange={(itemValue) => setDiabetes(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Não" value={false} />
            <Picker.Item label="Sim" value={true} />
          </Picker>
          <Text style={styles.label}>Cirurgia</Text>
          <Picker
            selectedValue={surgery}
            onValueChange={(itemValue) => setSurgery(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Não" value={false} />
            <Picker.Item label="Sim" value={true} />
          </Picker>
          <Text style={styles.label}>Hipertensão</Text>
          <Picker
            selectedValue={hypertension}
            onValueChange={(itemValue) => setHypertension(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Não" value={false} />
            <Picker.Item label="Sim" value={true} />
          </Picker>
          <Button title="Salvar" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
