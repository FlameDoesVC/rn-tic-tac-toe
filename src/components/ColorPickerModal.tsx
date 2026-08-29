import { useTheme } from '@/providers/_ThemeContext';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PRESET_COLORS = [
  '#e40000',
  '#007AFF',
  '#34C759',
  '#FF9500',
  '#AF52DE',
  '#FF2D55',
];

const HEX_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export default function ColorPickerModal({ visible, currentColor, onClose, onSelect }: { visible: boolean, currentColor: string, onClose: () => void, onSelect: (color: string) => void }) {
  const { theme } = useTheme();
  const [hexInput, setHexInput] = useState('');
  const [error, setError] = useState('');

  const handlePreset = (color: string) => {
    onSelect(color);
    setHexInput('');
    setError('');
  };

  const handleCustomSubmit = () => {
    const candidate = hexInput.startsWith('#') ? hexInput : `#${hexInput}`;
    if (!HEX_REGEX.test(candidate)) {
      setError('Enter a valid hex code, e.g. #FF0000');
      return;
    }
    onSelect(candidate);
    setHexInput('');
    setError('');
  };

  const handleClose = () => {
    setHexInput('');
    setError('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Pressable style={[styles.container, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]} onPress={() => {}}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Choose a color</Text>

          <View style={styles.swatchRow}>
            {PRESET_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => handlePreset(color)}
                style={[
                  styles.swatch,
                  { backgroundColor: color, borderColor: theme.colors.border },
                  color.toLowerCase() === currentColor.toLowerCase() && styles.swatchSelected,
                ]}
              />
            ))}
          </View>

          <Text style={[styles.label, { color: theme.colors.text }]}>Custom hex code</Text>
          <TextInput
            value={hexInput}
            onChangeText={setHexInput}
            placeholder="#RRGGBB"
            placeholderTextColor={theme.colors.border}
            autoCapitalize="characters"
            autoCorrect={false}
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleClose} style={styles.button}>
              <Text style={{ color: theme.colors.text }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCustomSubmit} style={styles.button}>
              <Text style={{ color: theme.colors.oColor }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
  },
  swatchSelected: {
    borderWidth: 3,
    borderColor: '#4cd964',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 4,
  },
  error: {
    color: '#e40000',
    fontSize: 12,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});
