import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import theme from "../../../utils/theme";

import { styles } from "./styles";

import Button from "../../../components/Button";
import { useAuth } from "../../../contexts/useAuth";
import { getUserById } from "../../../services/user";
import { useProfileNavigation } from "../../../hooks/navigation";
import { Appbar } from "react-native-paper";

export default function ProfileScreen() {
  const navigation = useProfileNavigation();

  const { userDataLogin, setUserDataLogin } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userDataLogin.id);
        setUserDataLogin(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Não foi possível carregar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userDataLogin.id]);

  if (loading) {
    return <ActivityIndicator style={{flex:1}} size="large" color={theme.colors.primary_100} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Perfil | Dados pessoais" />
        </Appbar.Header>

        <ScrollView>
          <View style={styles.menuProfile}>
            <Text style={[styles.label, { alignSelf: "center", fontSize: 20 }]}>
              {userDataLogin.name}
            </Text>
            <Text
              style={[styles.label, { alignSelf: "center", marginBottom: 20 }]}
            >
              {userDataLogin.email}
            </Text>
            <Text style={styles.label}>
              Status de Pagamento: {userDataLogin.status}
            </Text>

            <Text style={styles.label}>
              CPF: {formatCPF(userDataLogin.cpf)}
            </Text>

            {userDataLogin.isTrainer && (
              <Text style={styles.label}>
                CREF: {userDataLogin.cref || "Não especificado"}
              </Text>
            )}
            <Text style={styles.label}>Peso: {userDataLogin.weight} kg</Text>
            <Text style={styles.label}>Altura: {userDataLogin.height} cm</Text>
            <Text style={styles.label}>
              Telefone: {userDataLogin.phone || "Não especificado"}
            </Text>
            <Text style={styles.label}>
              Data de Nascimento: {userDataLogin.birth || "Não especificado"}
            </Text>
            <Text style={styles.label}>
              Gênero: {userDataLogin.gender || "Não especificado"}
            </Text>
          </View>

          <Button
            title="Editar Perfil"
            onPress={() => navigation.navigate("ProfilePersonalForm")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
