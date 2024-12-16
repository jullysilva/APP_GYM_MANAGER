import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";

import theme from "../../../utils/theme";
import { styles } from "./styles";
import Header from "../../../components/Header";

import { useInfoNavigation } from "../../../hooks/navigation";
import { getHealthFileById } from "../../../services/health";

import { useAuth } from "../../../contexts/useAuth";
import Button from "../../../components/Button";
import { Appbar } from "react-native-paper";

export default function InfoSaude() {
  const [loading, setLoading] = useState(true);
  const navigation = useInfoNavigation();

  const { healthData, setHealthData, userDataLogin } = useAuth();

  useEffect(() => {
    async function fetchHealthFile() {
      setLoading(true);

      if (!userDataLogin.healthFileId) {
        Alert.alert("Olá", "Crie sua ficha de saúde", [
          {
            text: "Criar",
            onPress: () => navigation.navigate("InfoSaudeForm"),
          },
        ]);
      } else {
        try {
          const data = await getHealthFileById(userDataLogin.healthFileId);

          setHealthData(data);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    }

    fetchHealthFile();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (!healthData) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Ficha de saúde" />
        </Appbar.Header>
        <View style={styles.card}>
          <Text style={styles.title}>Ficha de Saúde</Text>
          <Text style={styles.label}>Nome do Personal: </Text>
          <Text style={styles.text}>
            {healthData.name_personal_trainer || ""}
          </Text>
          <Text style={styles.label}>Lesão: </Text>
          <Text style={styles.text}>
            {healthData.lesion ? "Sim" : "Não" || ""}
          </Text>
          <Text style={styles.label}>Diabetes: </Text>
          <Text style={styles.text}>
            {healthData.diabetes ? "Sim" : "Não" || ""}
          </Text>
          <Text style={styles.label}>Cirurgia: </Text>
          <Text style={styles.text}>
            {healthData.surgery ? "Sim" : "Não" || ""}
          </Text>
          <Text style={styles.label}>Hipertensão: </Text>
          <Text style={styles.text}>
            {healthData.hypertension ? "Sim" : "Não" || ""}
          </Text>
        </View>

        <Button
          title={healthData.id ? "Atualizar" : "Criar"}
          onPress={() => navigation.navigate("InfoSaudeUpdate")}
        />
      </View>
    </SafeAreaView>
  );
}
