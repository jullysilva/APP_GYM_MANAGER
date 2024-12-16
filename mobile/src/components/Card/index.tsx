import React from "react";
import { TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import theme from "../../utils/theme";
import TextApp from "../Text";
import { styles } from "./styles";
import { ItemListProps } from "../../@types/app.list";

import { useInfoNavigation } from "../../hooks/navigation";

type CardProps = {
  item: ItemListProps;
};

export default function Card({ item }: CardProps) {
  const navigation = useInfoNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      onPress={() => navigation.navigate(item.route)}
      key={item.id}
    >
      <View style={styles.textBox}>
        <TextApp
          size={theme.fonts.subTitle}
          text={item.title}
          isBold
          fontWeight="500"
          color={theme.colors.gray_400}
        />
        <View style={styles.arrow}>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={theme.colors.gray_400}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
