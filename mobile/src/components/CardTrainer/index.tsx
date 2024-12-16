import React from "react";
import { TouchableOpacity, View } from "react-native";

import theme from "../../utils/theme";
import TextApp from "../Text";
import { styles } from "./styles";

import { useTrainerNavigation } from "../../hooks/navigation";
import { User } from "../../@types/signIn.interface";

type CardProps = {
  item: User;
};

export default function CardTrainer({ item }: CardProps) {
  const navigation = useTrainerNavigation();

  return (
    <>
      {!item.isTrainer && (
        <TouchableOpacity
          style={styles.container}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onPress={() => navigation.navigate("Student", item)}
          key={item.id}
        >
          <View style={styles.textBox}>
            <View style={styles.content}>
              <TextApp
                size={theme.fonts.subTitle}
                text={item.name}
                fontWeight="500"
                color={theme.colors.gray_400}
              />
            </View>

            <View style={styles.footer}></View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}
