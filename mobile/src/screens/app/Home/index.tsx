import React, { useEffect, useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { ProgressBar } from "react-native-paper";

import theme from "../../../utils/theme";
import { styles } from "./styles";
import Header from "../../../components/Header";
import WelcomeNotification from "../Notification";
import { getNotificationPermission } from "../Notification/NotificationPermissions";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

import bannerSuperior from '../../../assets/banner01.png';
import bannerInferior from '../../../assets/banner02.png';
import { useAuth } from "../../../contexts/useAuth";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextApp from "../../../components/Text";
import { useInfoNavigation, useTrainerNavigation } from "../../../hooks/navigation";

export default function Home() {


  const { userDataLogin} = useAuth();
  const navigation = useInfoNavigation();
  const navigationTrainer = useTrainerNavigation();
  
  useEffect(() => {
    const requestNotificationPermission = async () => {
      await getNotificationPermission();
    };
    requestNotificationPermission();
  }, []);
  const [lotacaoAtual, setLotacaoAtual] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const novoNumero = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
      setLotacaoAtual(novoNumero);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Header title={`Olá, ${userDataLogin.name || ''}`} />
      <View>
        <WelcomeNotification />
      </View>
      <View style={styles.bannerContainer}>
        
        <Image
          source={bannerSuperior }
          style={styles.banner}
        />
      
        
        <Image
          source={ bannerInferior }
          style={styles.banner}
        />
      </View>
      {userDataLogin.isTrainer ? (
        <View style={styles.box}>
        <TouchableOpacity style={styles.item}
        onPress={() => navigationTrainer.navigate("Trainer")}>
          <TextApp  size={20} text="Meus Alunos" color={theme.colors.gray_800}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <TextApp  size={20} text="Minha Ficha" color={theme.colors.gray_800}/>
        </TouchableOpacity>
      </View>
      ): (
        <View style={styles.box}>
        <TouchableOpacity style={styles.item}
        onPress={() => navigation.navigate("InfoTreino")}>
          <TextApp  size={20} text="Meus treinos" color={theme.colors.gray_800}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}
        onPress={() => navigation.navigate("InfoSaude")}>
          <TextApp  size={20} text="Minha Ficha" color={theme.colors.gray_800}/>
        </TouchableOpacity>
      </View>
      )}
      


      <View style={styles.content}>
        <Text style={styles.subtitle}>Status de lotação:</Text>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            progress={lotacaoAtual / 100}
            color={
              lotacaoAtual < 70
                ? theme.colors.success
                : lotacaoAtual < 90
                ? theme.colors.warning
                : theme.colors.danger
            }
            style={styles.progressBar}
          />
        </View>
        <Text style={styles.lotacaoText}>{lotacaoAtual}%</Text>
      </View>
    </View>
  );
}
