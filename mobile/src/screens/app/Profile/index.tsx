import React from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

import theme from "../../../utils/theme";
import { FontAwesome } from "@expo/vector-icons";

import { useAuth } from "../../../contexts/useAuth";

import { styles } from "./styles";
import Header from "../../../components/Header";
import TextApp from "../../../components/Text";
import ButtonItem from "./components/ButtonItem";
import { ButtonListProps } from "../../../@types/app.list";

import listButtonMenu from "./buttonList";

export default function Profile() {
  const { logout } = useAuth();

  function renderVertical(item: ButtonListProps) {
    return <ButtonItem item={item} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <View style={styles.container}>
        <Header title="Perfil" />
        <View style={styles.bodyProfile}>
          <View style={styles.menuProfile}>
            {listButtonMenu.length === 0 ? (
              <ActivityIndicator color={theme.colors.primary} size="large" />
            ) : (
              <FlatList
                snapToAlignment={"start"}
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, i) => `${item}${i}`}
                data={listButtonMenu}
                renderItem={({ item }) => renderVertical(item)}
                style={{}}
                ListFooterComponent={
                  <TouchableOpacity onPress={() => logout()}>
                    <View style={[styles.underlineButton, { marginTop: 100 }]}>
                      {/* <FontAwesome
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        name={"arrow-right"}
                        size={24}
                        color={theme.colors.primary}
                        style={{ marginRight: 20 }}
                      /> */}
                      <TextApp
                        text="sair"
                        size={theme.fonts.title}
                        color={theme.colors.primary}
                      />
                    </View>
                  </TouchableOpacity>
                }
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
