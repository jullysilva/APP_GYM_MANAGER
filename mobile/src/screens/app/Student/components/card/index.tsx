import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Exercise } from "../../../../../mock/trainingList";
import { styles } from "../card/styles";

export default function Card({
  id,
  name,
  category,
  equipment,
  interval,
  repetitions,
  series,
}: Exercise) {
  const [countdown, setCountdown] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(timer);
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [countdown, isActive]);

  const handlePress = () => {
    if (isActive) {
      setCountdown(0);
      setIsActive(false);
    } else {
      setCountdown(interval);
      setIsActive(true);
    }
  };

  return (
    <TouchableOpacity style={styles.card} key={id} onPress={handlePress}>
      <View style={styles.content}>
        <Text style={styles.title}>{name.toUpperCase()}</Text>
        <Text style={styles.text}>Categoria: {category}</Text>
        <Text style={styles.text}>Equipamento: {equipment}</Text>
        <Text style={styles.text}>Séries: {series}</Text>
        <Text style={styles.text}>Repetições: {repetitions}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.text, {color: '#fbfbfb', fontWeight: "bold"}]}>
          {isActive ? `Intervalo: ${countdown} segundos` : `Intervalo: ${interval} segundos`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
