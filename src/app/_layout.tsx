import { CustomScoreProvider } from "@/providers/_ScoreContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CustomThemeProvider, useTheme } from "../providers/_ThemeContext";

function RootStack() {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ title: 'Settings', }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <CustomThemeProvider>
      <CustomScoreProvider>
        <RootStack />
      </CustomScoreProvider>
    </CustomThemeProvider>
  );
}
