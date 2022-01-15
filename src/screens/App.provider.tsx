import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  createContext,
} from "react";
import { MoodOptionType, MoodOptionWithTimestamp } from "../types";

import AsyncStorage from "@react-native-async-storage/async-storage";

type AppDataType = {
  moodList: MoodOptionWithTimestamp[];
};

const dataKey = "app_moodTracker";

const setData = async (appData: AppDataType) =>
  await AsyncStorage.setItem(dataKey, JSON.stringify(appData));

const getData = async (): Promise<AppDataType | null> => {
  try {
    const result = await AsyncStorage.getItem(dataKey);

    if (result) {
      return JSON.parse(result);
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};
const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => ({}),
});

export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);
  const handleSelectMood = useCallback((selectMood: MoodOptionType) => {
    setMoodList((current) => {
      const newMooodlist = [
        ...current,
        { mood: selectMood, timestamp: Date.now() },
      ];
      setData({ moodList: newMooodlist });
      return newMooodlist;
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) {
        setMoodList(data.moodList);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
