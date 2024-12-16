import React, { useState } from "react";
import { View, SafeAreaView, TextInput, Text, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

import theme from "../../../utils/theme";
import { styles } from "./styles";
import Header from "../../../components/Header";
import { updateHealthFile } from "../../../services/health";
import Button from "../../../components/Button";
import { useAuth } from "../../../contexts/useAuth";
import { HealthFile } from "../../../@types/signIn.interface";
import { useInfoNavigation } from "../../../hooks/navigation";

export default function InfoSaudeUpdate() {
  const { healthData, setHealthData, userDataLogin } = useAuth();

  const [namePersonalTrainer, setNamePersonalTrainer] = useState<string>(
    String(healthData.name_personal_trainer)
  );
  const [lesion, setLesion] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [surgery, setSurgery] = useState(false);
  const [hypertension, setHypertension] = useState(false);

  const navigation = useInfoNavigation();

  async function handleSubmit() {
    try {
      const newHealthFile: Omit<HealthFile, "id"> = {
        name_personal_trainer: namePersonalTrainer,
        lesion,
        diabetes,
        surgery,
        hypertension,
        userId: userDataLogin.id,
      };

      const createdHealthFile = await updateHealthFile(
        String(userDataLogin.healthFileId),
        newHealthFile
      );

      setHealthData(createdHealthFile);

      Alert.alert("Sucesso", "Ficha de saúde atualizada com sucesso", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a ficha de saúde");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <View style={styles.container}>
        <Header title="Atualizar Ficha de Saúde" />
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
          <Button
            title="Cancelar"
            transparent
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
