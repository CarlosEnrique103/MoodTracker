import React from "react";
import { View, StyleSheet } from "react-native";
import { MoodItemRow } from "../components/MoodItemRow";
import { useAppContext } from "./App.provider";

export const History: React.FC = () => {
  const { moodList } = useAppContext();
  return (
    <View style={styles.container}>
      {moodList.map((item) => (
        <MoodItemRow key={item.timestamp} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
