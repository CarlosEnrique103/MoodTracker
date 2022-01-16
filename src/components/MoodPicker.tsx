import React, { useCallback, useState } from "react";
import { Image, Pressable, View, Text, StyleSheet } from "react-native";
import { MoodOptionType } from "../types";
import { theme } from "../theme";

const moodOptions: MoodOptionType[] = [
  { emoji: "🤓", description: "studious" },
  { emoji: "🤔", description: "pensive" },
  { emoji: "😊", description: "happy" },
  { emoji: "💝", description: "celebratory" },
  { emoji: "😤", description: "frustrated" },
];

type MoodPickerProps = {
  handleSelectMood: (mood: MoodOptionType) => void;
};
export const MoodPicker: React.FC<MoodPickerProps> = ({ handleSelectMood }) => {
  const [selectMood, setSelectMood] = useState<MoodOptionType>();
  const [hasChoose, setHasChoose] = useState(false);
  const handleSelect = useCallback(() => {
    if (selectMood) {
      handleSelectMood(selectMood);
      setSelectMood(undefined);
      setHasChoose(true);
    }
  }, [selectMood, handleSelectMood]);

  if (hasChoose) {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/butterfly.png")}
          style={styles.image}
        />
        <Pressable style={styles.button} onPress={() => setHasChoose(false)}>
          <Text style={styles.buttonText}>Choose Again!</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map((option) => (
          <View key={option.emoji}>
            <Pressable
              style={[
                styles.moodItem,
                option.emoji === selectMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}
              onPress={() => setSelectMood(option)}
            >
              <Text>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {option.emoji === selectMood?.emoji
                ? option.description
                : undefined}
            </Text>
          </View>
        ))}
      </View>
      <View>
        <Pressable style={styles.button} onPress={handleSelect}>
          <Text style={styles.buttonText}>Choose</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  moodList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moodItem: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },

  descriptionText: {
    color: "#454C73",
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
  },
  container: {
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 10,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 20,
    color: theme.colorWhite,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    alignSelf: "center",
  },
});
