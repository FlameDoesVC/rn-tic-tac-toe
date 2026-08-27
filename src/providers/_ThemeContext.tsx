// ThemeContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, useColorScheme, View } from 'react-native';
import { darkTheme, lightTheme, ThemeType } from '../constants/_themes';

// Storage keys
const THEME_MODE_KEY = '@app_theme_mode';
const X_COLOR_KEY = '@app_x_color';
const O_COLOR_KEY = '@app_o_color';

interface ThemeContextProps {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
  XColor: string;
  OColor: string;
  updateXColor: (color: string) => Promise<void>;
  updateOColor: (color: string) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  
  const [XColor, setXColor] = useState('');
  const [OColor, setOColor] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPersistedSettings = async () => {
      try {
        const keys = [THEME_MODE_KEY, X_COLOR_KEY, O_COLOR_KEY];
        const stores = await AsyncStorage.multiGet(keys);
        
        const savedTheme = stores.find(([key]) => key === THEME_MODE_KEY)?.[1];
        const savedXColor = stores.find(([key]) => key === X_COLOR_KEY)?.[1];
        const savedOColor = stores.find(([key]) => key === O_COLOR_KEY)?.[1];

        if (savedTheme !== null) setIsDark(savedTheme === 'dark');
        if (savedXColor) setXColor(savedXColor);
        if (savedOColor) setOColor(savedOColor);

      } catch (error) {
        console.error('Failed to load user theme preferences', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersistedSettings();
  }, []);

  const toggleTheme = async () => {
    const nextDarkState = !isDark;
    setIsDark(nextDarkState);
    await AsyncStorage.setItem(THEME_MODE_KEY, nextDarkState ? 'dark' : 'light');
  };

  const updateXColor = async (color: string) => {
    setXColor(color);
    await AsyncStorage.setItem(X_COLOR_KEY, color);
  };

  const updateOColor = async (color: string) => {
    setOColor(color);
    await AsyncStorage.setItem(O_COLOR_KEY, color);
  };

  const baseTheme = isDark ? darkTheme : lightTheme;
  const theme: ThemeType = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      xColor: XColor || baseTheme.colors.xColor,
      oColor: OColor || baseTheme.colors.oColor,
    },
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        isDark, 
        toggleTheme, 
        XColor: theme.colors.xColor,
        OColor: theme.colors.oColor,
        updateXColor, 
        updateOColor
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a CustomThemeProvider');
  return context;
};
