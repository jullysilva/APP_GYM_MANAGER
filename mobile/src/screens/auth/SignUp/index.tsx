import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Alert,
} from "react-native";
import { UpdateUserRegister } from "../../../@types/signOff.interface";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useInitialNavigation } from "../../../hooks/navigation";

import { styles } from "./styles";
import TextApp from "../../../components/Text";
import theme from "../../../utils/theme";
import { updateUser } from "../../../services/user";
import { useAuth } from "../../../contexts/useAuth";




export default function SignUp() {
  const navigation = useInitialNavigation();

  const { userDataLogin, login , setUserDataLogin} = useAuth();
  
  const [userRegister, setUserRegister] = useState<UpdateUserRegister>(
    {} as UpdateUserRegister
  );
  const [isError, setIsError] = useState<boolean>(false);

  const onSubmit = async () => {
    if(userRegister.password === userRegister.confirmPassword) {
      handleRegister(userRegister);
    } else {
      Alert.alert('Atenção','As senhas não são iguais!');
      setUserRegister({} as UpdateUserRegister);
    }
  };

  const handleRegister = async (values: UpdateUserRegister) => {
    const newUserDataLogin = {
      name: userDataLogin.name,
      email: userDataLogin.email,
      status: userDataLogin.status,
      active: userDataLogin.active,
      cpf: userDataLogin.cpf,
      isTrainer: userDataLogin.isTrainer,
      cref: userDataLogin.cref,
      weight: userDataLogin.weight,
      height: userDataLogin.height,
      phone: userDataLogin.phone,
      birth: userDataLogin.birth,
      gender: userDataLogin.gender,
      password: values.password,
      firstAccess: false
    }
    

   
    try {
      let response = await updateUser(userDataLogin.id, newUserDataLogin);

      if (response.status === 200 || 201) {
        setUserDataLogin(response.data.user)
        
        Alert.alert("Bem vindo", "Cadastro Realizado com sucesso!");
        login();
      } else {
        setIsError(true);
        alert("Erro durante processo de registro da nova senha, tente novamente!");
        navigation.navigate("SignIn");
      }
    } catch (erro) {
      setIsError(true);

      alert("Erro ao cadastrar. Tente novamente em segundos...");
      throw new Error("Ocorreu um erro durante o processamento.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Primeiro acesso</Text>
        </View>
        <KeyboardAvoidingView style={{ paddingTop: 40 }}>
          
         
         
          <Input
            text="Nova senha (max:. 8 dígitos)"
            onChangeText={(text) => {
              userRegister.password = text;
              setUserRegister({ ...userRegister });
            }}
            value={userRegister.password}
            placeholder={"Crie sua senha"}
            password={true}
            maxLength={8}
          />
          <Input
            text="Confirme sua senha"
            onChangeText={(text) => {
              userRegister.confirmPassword = text;
              setUserRegister({ ...userRegister });
            }}
            value={userRegister.confirmPassword}
            placeholder={"Digite novamente a senha"}
            password={true}
          />
          <Button onPress={() => onSubmit()} title="Entrar" />
        </KeyboardAvoidingView>
        <View style={{ paddingTop: 24, flexDirection: "row" }}>
          <TextApp text="Volte ao" size={16} color={theme.colors.text} />
          <View style={{ paddingHorizontal: 8 }}>
            <TextApp
              text="Login"
              size={16}
              color={theme.colors.primary}
              onPress={() => navigation.navigate("SignIn")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
