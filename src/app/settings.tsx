import { useScore } from '@/providers/_ScoreContext';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import ColorPickerModal from '../components/ColorPickerModal';
import { useTheme } from '../providers/_ThemeContext';

export default function Settings() {
  const navigation = useNavigation();
  const { theme, XColor, OColor, updateXColor, updateOColor, toggleTheme } = useTheme();
  const { resetOScore, resetXScore } = useScore();
  const [pickerFor, setPickerFor] = useState<'X' | 'O' | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: theme.colors.background },
      headerTintColor: theme.colors.text,
      contentStyle: { backgroundColor: theme.colors.background },
    });
  }, [navigation, theme.dark]);

  const handleResetScoreboard = () => {
    Alert.alert(
      "Are you sure?",
      "Do you want to reset the scoreboard?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            resetXScore();
            resetOScore();
          },
        }
      ]
    );
  };

  const handleColorSelect = (color: string) => {
    if (pickerFor === 'X') updateXColor(color);
    if (pickerFor === 'O') updateOColor(color);
    setPickerFor(null);
  };

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

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 16, color: theme.colors.text }}>X Color</Text>
          <TouchableOpacity
            onPress={() => setPickerFor('X')}
            style={[styles.swatch, { backgroundColor: XColor, borderColor: theme.colors.border }]}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 16, color: theme.colors.text }}>O Color</Text>
          <TouchableOpacity
            onPress={() => setPickerFor('O')}
            style={[styles.swatch, { backgroundColor: OColor, borderColor: theme.colors.border }]}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 16, color: theme.colors.text }}>Reset Scoreboard</Text>
          <TouchableOpacity onPress={handleResetScoreboard}>
            <Text style={{ fontSize: 16, color: theme.colors.xColor }}>Reset</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>

    <ColorPickerModal
      visible={pickerFor !== null}
      currentColor={pickerFor === 'X' ? XColor : OColor}
      onClose={() => setPickerFor(null)}
      onSelect={handleColorSelect}
    />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  swatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
  },
});
