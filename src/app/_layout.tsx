import { CustomScoreProvider } from "@/providers/_ScoreContext";
import { Stack } from "expo-router";
import { CustomThemeProvider } from "../providers/_ThemeContext";

export default function RootLayout() {
  return (
    <CustomThemeProvider>
      <CustomScoreProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ title: 'Settings', }} />
        </Stack>
      </CustomScoreProvider>
    </CustomThemeProvider>
  );
}
