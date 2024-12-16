import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";

import theme from "../../../utils/theme";

import { styles } from "./styles";
import Header from "../../../components/Header";
import TextApp from "../../../components/Text";
import termoData from "./termoData";
import { Appbar } from "react-native-paper";
import { useProfileNavigation } from "../../../hooks/navigation";

export default function ProfileTerms() {
  const navigation = useProfileNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.shape }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Termos" />
      </Appbar.Header>
      <View style={styles.container}></View>

      <ScrollView style={styles.text}>
        <TextApp text={termoData} size={14} />
      </ScrollView>
    </SafeAreaView>
  );
}
