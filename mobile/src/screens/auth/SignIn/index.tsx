import React, { useState } from "react";
import { Text, View, KeyboardAvoidingView, Platform } from "react-native";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useInitialNavigation } from "../../../hooks/navigation";

import { useAuth } from "../../../contexts/useAuth";

import { styles } from "./styles";
import TextApp from "../../../components/Text";
import theme from "../../../utils/theme";

import { UserLogin } from "../../../@types/signOff.interface";
import { authenticateUser } from "../../../services/user";
import { ScrollView } from "react-native-gesture-handler";

export default function SignIn() {
  const { setUserDataLogin, login } = useAuth();

  const navigation = useInitialNavigation();

  const [message, setMessage] = useState<string>("");
  const [userLogin, setUserLogin] = useState<UserLogin>({} as UserLogin);
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    handleLogin(userLogin);
  };

  const handleLogin = async (values: UserLogin) => {
    if (!userLogin.email && !userLogin.password) {
      alert("Dados inválidos, preencha seu email e senha!");
    } else {
      try {
        setLoading(true);

        let response = await authenticateUser(values);

        if (response.status === 200) {
          setUserDataLogin(response.data.user);

          if (response.data.user.firstAccess) {
            navigation.navigate("SignUp");
          } else {
            login();
          }
        } else {
          setIsError(true);
          alert("Erro durante processo de login, tente novamente!");
        }
      } catch (erro) {
        setIsError(true);
        alert("Credenciais não encontradas!");
        throw new Error("Ocorreu um erro durante o processamento.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Olá,</Text>
          <TextApp
            size={20}
            text="Hoje é dia de treino! Faça login para continuar"
          />
          <TextApp
            text="Seu primeiro acesso? digite sua senha temporárea"
            size={16}
            color={theme.colors.text}
          />
          <View style={{ alignSelf: "center" }}>
            <TextApp size={100} text="HIKE" isBold></TextApp>
          </View>
        </View>
        {isError && (
          <TextApp text={message} size={16} color={theme.colors.red} />
        )}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <Input
            text="E-mail"
            keyboardType="email-address"
            value={userLogin.email}
            onChangeText={(text) => {
              userLogin.email = text;
              setUserLogin((prevState) => ({ ...prevState, email: text }));
            }}
            placeholder={"Digite seu e-mail"}
            maxLength={40}
          />

          <Input
            text="Senha"
            value={userLogin.password}
            onChangeText={(text) => {
              userLogin.password = text;
              setUserLogin((prevState) => ({ ...prevState, password: text }));
            }}
            placeholder={"Digite sua senha"}
            maxLength={30}
            password={true}
          />

          <Button
            onPress={() => onSubmit()}
            title={loading ? "Entrando..." : "Entrar"}
            disabled={loading}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
