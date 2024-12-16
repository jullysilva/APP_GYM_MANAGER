import React from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import theme from "../../../../../utils/theme";
import TextApp from "../../../../../components/Text";
import { useProfileNavigation } from "../../../../../hooks/navigation";
import { ButtonListProps } from "../../../../../@types/app.list";

type ButtonProps = TouchableOpacityProps & {
  item: ButtonListProps;
};

export default function ButtonItem({ item }: ButtonProps) {
  const navigation = useProfileNavigation();
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.buttonItem}
      onPress={() => navigation.navigate(item.route)}
    >
      <View style={styles.underlineButton}>
        {/* <FontAwesome
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          name={item.nameIcon}
          size={24}
          color={theme.colors.primary}
          style={{ width: 40 }}
        /> */}
        <TextApp
          text={item.title}
          size={theme.fonts.subTitle}
          color={theme.colors.gray_400}
        />
      </View>
      <View style={styles.arrow}>
        <MaterialIcons
          name="arrow-forward-ios"
          size={20}
          color={theme.colors.gray_400}
        />
      </View>
    </TouchableOpacity>
  );
}
