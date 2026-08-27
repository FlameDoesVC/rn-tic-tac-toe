// import { Host, Shape, Text, TextButton } from '@expo/ui/jetpack-compose';
// import { Text } from '@expo/ui/jetpack-compose';
// import { size } from '@expo/ui/jetpack-compose/modifiers';
import { useTheme } from '@/providers/_ThemeContext';
import { Text, TouchableOpacity, useWindowDimensions } from 'react-native';

export default function TicTacButton({ state, gameState, onPress }: { state: string | null, gameState: number, onPress: () => void }) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { theme } = useTheme();

  const sq = screenWidth * 0.2;
  const fontSize = screenHeight * 0.1;

  let color = state == "X" ? theme.colors.xColor : (state == "O" ? theme.colors.oColor : theme.colors.text);
  // if game is tied or (X won and we are O) or (O won and we are X)
  if (gameState == 3 || (gameState === 1 && state === "O") || (gameState === 2 && state === "X")) {
    color = theme.colors.loseColor;
  }
  
  // console.log(gameState, state, (gameState === 1 && state === "O"), (gameState === 2 && state === "X"), color);
  const title = state ?? "";

  return (
    // <Host matchContents>
    //     <TextButton modifiers={[size(sq, sq)]} onClick={onPress} shape={Shape.RoundedCorner({
    //       cornerRadii: {  },
    //     })}>
    //       <Text>{title}</Text>
    //     </TextButton>
    // </Host>
    <TouchableOpacity onPress={onPress} style={{ width: sq, height: sq, justifyContent: 'center', alignItems: 'center', borderRadius: 0 }}>
        <Text style={{ fontSize, fontWeight: 'bold', color: color }}>{title}</Text>
    </TouchableOpacity>
  );
}