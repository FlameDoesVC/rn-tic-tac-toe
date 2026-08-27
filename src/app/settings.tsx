import { useScore } from '@/providers/_ScoreContext';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '../providers/_ThemeContext';

export default function Settings() {
  const navigation = useNavigation();
  const { theme, updateXColor, updateOColor, toggleTheme } = useTheme();
  const { resetOScore, resetXScore } = useScore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: theme.colors.background },
      headerTintColor: theme.colors.text,
      contentStyle: { backgroundColor: theme.colors.background },
    });
  }, [navigation, theme.dark]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 16, color: theme.colors.text }}>Dark Mode</Text>
          <Switch 
            value={theme.dark}
            onValueChange={() => {toggleTheme()}} 
            trackColor={{ true: '#4cd964', false: '#e9e9ea' }}
          />
        </View>
    </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  // container: {}
});
