import React, { useState } from "react";
import { View, SafeAreaView, Alert, ScrollView } from "react-native";
import theme from "../../../utils/theme";
import { styles } from "./styles";

import Button from "../../../components/Button";
import InputMask from "../../../components/InputMask";
import { useAuth } from "../../../contexts/useAuth";
import { updateUser } from "../../../services/user";
import { useProfileNavigation } from "../../../hooks/navigation";
import * as yup from "yup";

export default function ProfilePersonalForm() {
  const navigation = useProfileNavigation();
  const { userDataLogin, setUserDataLogin } = useAuth();

  const [name, setName] = useState(userDataLogin.name);
  const [weight, setWeight] = useState(userDataLogin.weight);
  const [height, setHeight] = useState(userDataLogin.height);
  const [phone, setPhone] = useState(userDataLogin.phone);
  const [birth, setBirth] = useState(userDataLogin.birth);
  const [gender, setGender] = useState(userDataLogin.gender);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    weight: yup.number().required("Peso é obrigatório").positive("Peso deve ser positivo"),
    height: yup.number().required("Altura é obrigatória").positive("Altura deve ser positiva"),
    phone: yup.string().required("Telefone é obrigatório").matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
    birth: yup.string().required("Data de nascimento é obrigatória").matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data de nascimento inválida"),
    gender: yup.string().required("Gênero é obrigatório"),
  });

  const handleUpdate = async () => {
    try {
      await schema.validate({ name, weight, height, phone, birth, gender });
      setLoading(true);

      const updatedFields = { name, weight, height, phone, birth, gender };
      await updateUser(userDataLogin.id, updatedFields);
      
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error instanceof yup.ValidationError) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert("Erro", "Não foi possível atualizar o perfil.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView>
            <InputMask
              text="Nome"
              value={name}
              onChangeText={setName}
              placeholder="Nome"
            />
            <InputMask
              text="Peso"
              value={weight?.toString()}
              onChangeText={(text) => setWeight(Number(text))}
              placeholder="Peso"
              keyboardType="numeric"
            />
            <InputMask
              text="Altura"
              value={height?.toString()}
              onChangeText={(text) => setHeight(Number(text))}
              placeholder="Altura"
              keyboardType="numeric"
            />
            <InputMask
              text="Telefone"
              value={phone}
              onChangeText={setPhone}
              placeholder="Telefone"
              keyboardType="phone-pad"
              maskType="cel-phone"
              options={{ maskType: "BRL", withDDD: true, dddMask: "(99) " }}
            />
            <InputMask
              text="Data de Nascimento"
              value={birth}
              onChangeText={setBirth}
              placeholder="Data de Nascimento"
              maskType="datetime"
              options={{ format: "DD/MM/YYYY" }}
            />
            <InputMask
              text="Gênero"
              value={gender}
              onChangeText={setGender}
              placeholder="Gênero"
            />
            <Button
              title={loading ? "Atualizando..." : "Atualizar Perfil"}
              onPress={handleUpdate}
              disabled={loading}
            />
            <Button
              title={'Cancelar'}
              onPress={() => navigation.navigate("Profile")}
              transparent
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
