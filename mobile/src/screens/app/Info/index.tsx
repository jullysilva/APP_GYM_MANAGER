import React from "react";
import { View, SafeAreaView, ActivityIndicator, FlatList } from "react-native";

import theme from "../../../utils/theme";

import { style } from "./styles";
import Card from "../../../components/Card";
import { ItemListProps } from "../../../@types/app.list";

import listMenu from "./list";
import Header from "../../../components/Header";

export default function Info() {
  function renderVertical(item: ItemListProps) {
    return <Card item={item} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <View style={style.container}>
        <Header title="Minhas fichas" />

        <View style={{ width: "100%" }}>
          {listMenu.length === 0 ? (
            <ActivityIndicator color={theme.colors.primary} size="large" />
          ) : (
            <FlatList
              snapToAlignment={"start"}
              scrollEventThrottle={16}
              decelerationRate={"fast"}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, i) => `${item}${i}`}
              data={listMenu}
              renderItem={({ item }) => renderVertical(item)}
              style={{}}
              ListFooterComponent={<View style={{}} />}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
