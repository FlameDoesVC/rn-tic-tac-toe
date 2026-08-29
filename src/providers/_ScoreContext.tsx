import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";


const X_SCORE_KEY = '@app_x_score';
const O_SCORE_KEY = '@app_o_score';

interface ScoreContextProps {
  XScore: number;
  OScore: number;
  incrementXScore: () => Promise<void>;
  incrementOScore: () => Promise<void>;
  resetXScore: () => Promise<void>;
  resetOScore: () => Promise<void>;
}

const ScoreContext = createContext<ScoreContextProps | undefined>(undefined);

export const CustomScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [XScore, setXScore] = useState(0);
  const [OScore, setOScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPersistedSettings = async () => {
      try {
        const keys = [X_SCORE_KEY, O_SCORE_KEY];
        const stores = await AsyncStorage.multiGet(keys);
        
        const savedXScore = stores.find(([key]) => key === X_SCORE_KEY)?.[1];
        const savedOScore = stores.find(([key]) => key === O_SCORE_KEY)?.[1];

        if (savedXScore) setXScore(parseInt(savedXScore) ?? 0);
        if (savedOScore) setOScore(parseInt(savedOScore) ?? 0);

      } catch (error) {
        console.error('Failed to load user score preferences', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersistedSettings();
  }, []);

  const incrementXScore = async () => {
    const score = XScore+1;
    setXScore(score);
    await AsyncStorage.setItem(X_SCORE_KEY, score.toString());
  };

  const incrementOScore = async () => {
    const score = OScore+1;
    setOScore(score);
    await AsyncStorage.setItem(O_SCORE_KEY, score.toString());
  };

  const resetXScore = async () => {
    setXScore(0);
    await AsyncStorage.setItem(X_SCORE_KEY, "0");
  };

  const resetOScore = async () => {
    setOScore(0);
    await AsyncStorage.setItem(O_SCORE_KEY, "0");
  };


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScoreContext.Provider 
      value={{
        XScore,
        OScore,
        incrementXScore, 
        incrementOScore,
        resetXScore, 
        resetOScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) throw new Error('useTheme must be used within a CustomThemeProvider');
  return context;
};
