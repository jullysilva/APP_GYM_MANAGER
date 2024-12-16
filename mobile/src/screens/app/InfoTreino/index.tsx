import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList, ActivityIndicator, Text } from "react-native";
import theme from "../../../utils/theme";
import { styles } from "./styles";
import Card from "./components/card";

import { useAuth } from "../../../contexts/useAuth";
import { getExercise, getTrainingSheets } from "../../../services/training";
import { Exercises, TrainingSheet } from "../../../@types/signIn.interface";

import { Appbar } from "react-native-paper";
import { useInfoNavigation } from "../../../hooks/navigation";

export default function InfoTreino() {
  const { userDataLogin } = useAuth();
  const navigation = useInfoNavigation();

  const [trainingSheet, setTrainingSheet] = useState<TrainingSheet>();
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainingSheetAndExercises = async () => {
    try {
      const allTrainingSheets = await getTrainingSheets();

      if (allTrainingSheets) {
        const userTrainingSheet = allTrainingSheets.data.find(
          (sheet: any) => sheet.userId === userDataLogin.id
        );

        if (!userTrainingSheet) {
          throw new Error("Ficha de treino não encontrada para o usuário");
        } else {
          setTrainingSheet(userTrainingSheet);
          
          const exercisePromises = userTrainingSheet.exerciseIds.map(
            (exerciseId: any) => getExercise(exerciseId)
          );
          const exerciseData = await Promise.all(exercisePromises);

          setExercises(exerciseData);
        }
      } else {
        setError("Entre em contato com o gestor\n e cadastre sua ficha de treino.");
      }
    } catch (error) {
      
      setError("Entre em contato com o gestor\n e cadastre sua ficha de treino.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingSheetAndExercises();
  }, [userDataLogin.id]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.shape, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary}/>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.shape, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.colors.primary }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`Ficha de treino: ${trainingSheet?.title || ""}`} />
      </Appbar.Header>
      <View style={styles.container}>
        <FlatList
          data={exercises}
          showsVerticalScrollIndicator={false}
          keyExtractor={(exercise) => exercise.id}
          renderItem={({ item }) => <ExerciseCard exercise={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

type CardProps = {
  exercise: Exercises;
};

const ExerciseCard = ({ exercise }: CardProps) => {
  return (
    <Card
      id={exercise._id}
      name={exercise.name}
      category={exercise.category}
      equipment={exercise.equipament}
      series={exercise.serie}
      repetitions={exercise.num_rep}
      interval={exercise.interval}
    />
  );
};
