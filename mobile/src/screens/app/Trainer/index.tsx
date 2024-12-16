import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ActivityIndicator, FlatList, Text } from "react-native";
import theme from "../../../utils/theme";
import { style } from "./styles";
import { ItemListProps } from "../../../@types/app.list";
import Header from "../../../components/Header";
import { listUsers } from "../../../services/user";
import { User } from "../../../@types/signIn.interface";
import { useAuth } from "../../../contexts/useAuth";
import CardTrainer from "../../../components/CardTrainer";


export default function Trainer() {
  const [users, setUsers] = useState<ItemListProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { userDataLogin, healthData} = useAuth();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await listUsers();
        
        setUsers(usersData.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [users]);

  function renderVertical({ item }: { item: User }) {
    return <CardTrainer item={item}/>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.shape }}>
      <View style={style.container}>
        <Header title={userDataLogin.isTrainer? 'Meus Alunos': 'Instrutor(a)'} />

        {
          userDataLogin.isTrainer ? (
            loading ? (
              <ActivityIndicator size="large" color={theme.colors.primary} />
            ) : (
              <FlatList
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderVertical}
                contentContainerStyle={{ padding: 16 }}
              />
            )
          ):(
              <View style={style.trainerName}>
                <Text>Nome:</Text>
                <Text>{healthData.name_personal_trainer || 'Não informado!'}</Text>
              </View>
          )
        }
        
      </View>
    </SafeAreaView>
  );
}
