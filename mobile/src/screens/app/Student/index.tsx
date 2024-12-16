import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Text,
  FlatList,
} from "react-native";
import theme from "../../../utils/theme";

import { RouteProp, useRoute } from "@react-navigation/native";
import { useAuth } from "../../../contexts/useAuth";

import { styles } from "./styles";

import { useTrainerNavigation } from "../../../hooks/navigation";
import { TrainerRoutesParams } from "../../../routes/routes";
import { Appbar } from "react-native-paper";
import TextApp from "../../../components/Text";
import { getTrainingSheets, getExercise } from "../../../services/training";
import { Exercises, TrainingSheet } from "../../../@types/signIn.interface";
import Card from "./components/card";

type TrainerScreenProps = RouteProp<TrainerRoutesParams, "Student">;

export default function Student() {
  const navigation = useTrainerNavigation();
  const { params } = useRoute<TrainerScreenProps>();
  const { userDataLogin } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trainingSheet, setTrainingSheet] = useState<TrainingSheet>();
  const [exercises, setExercises] = useState<any[]>([]);

  const fetchTrainingSheetAndExercises = async () => {
    setLoading(true);
    
    try {
      const allTrainingSheets = await getTrainingSheets();
      if (allTrainingSheets) {
        const userTrainingSheet = allTrainingSheets.data.find(
          (sheet: any) => sheet.userId === params.id
        );
        if (!userTrainingSheet) {
          return
        } else {
          setTrainingSheet(userTrainingSheet);

          const exercisePromises = userTrainingSheet.exerciseIds.map(
            (exerciseId: any) => getExercise(exerciseId)
          );
          const exerciseData = await Promise.all(exercisePromises);
          setExercises(exerciseData);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar fichas de treino e exercícios:", error);
      setError("Não foi possível carregar a ficha de treino e exercícios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingSheetAndExercises();
  }, [params.id]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} size="large" color="#0000ff" />;
  }

 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`Ficha do(a) ${params.name}`} />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.menuProfile}>
          <View style={{ alignSelf: "center", marginBottom: 20 }}>
            <TextApp size={16} text="Ficha de Saúde" fontWeight="500" />
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>

          <Text style={styles.label}>Peso: {params.weight} kg</Text>
          <Text style={styles.label}>Altura: {params.height} cm</Text>
          </View>
         
          
        </View>

        {trainingSheet ? (
          <View style={{ flex: 1 }}>
            <View style={{ alignSelf: "center", marginBottom: 20 }}>
              <TextApp size={16} text={`Ficha de Treino: ${trainingSheet.title}`} fontWeight="500" />
            </View>
            {exercises.length > 0 ? (
              <FlatList
                data={exercises}
                showsVerticalScrollIndicator={false}
                keyExtractor={(exercise) => exercise.id}
                renderItem={({ item }) => <ExerciseCard exercise={item} />}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            ) : (
              <Text style={styles.noExercisesText}>
                Nenhum exercício encontrado para esta ficha de treino.
              </Text>
            )}
          </View>
        ) : (
          <Text style={styles.noTrainingSheetText}>
            Não há ficha de treino para este aluno. Por favor, cadastre com o gestor da academia.
          </Text>
        )}
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
