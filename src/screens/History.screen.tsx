import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { MoodItemRow } from "../components/MoodItemRow";
import { useAppContext } from "./App.provider";

export const History: React.FC = () => {
  const { moodList } = useAppContext();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {moodList.map((item) => (
          <MoodItemRow key={item.timestamp} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
