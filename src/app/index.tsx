import Scoreboard from "@/components/Scoreboard";
import { useScore } from "@/providers/_ScoreContext";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import BigSpacer from "../components/BigSpacer";
import Board from "../components/Board";
import { useTheme } from "../providers/_ThemeContext";

export default function Index() {
  const navigation = useNavigation();
  const router = useRouter();
  
  const { theme } = useTheme();
  const { incrementOScore, incrementXScore } = useScore();
  const [ boardStates, setBoardStates ] = useState(Array(9).fill(null));
  const [ gameState, setGameState ] = useState(0); // 0 - ongoing, 1 - X won, 2 - O won, 3 - Tie
  const [ isCurrentPlayerX, setIsCurrentPlayerX ] = useState(Math.random() > 0.5);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: theme.colors.background },
      headerTintColor: theme.colors.text,
      contentStyle: { backgroundColor: theme.colors.background },
    });
  }, [navigation, theme.dark]);

  const resetBoard = () => {
    setBoardStates(Array(9).fill(null));
    setGameState(0);
    setIsCurrentPlayerX(Math.random() > 0.5);
  }

  const checkWinner = (states: (string | null)[]) => {
    if (states.every((s) => s !== null)) {
      setGameState(3);
    }

    const winningStatesMatrix = [
      // rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];
    const winningStates = winningStatesMatrix.map((m) => m.map(n => states[n]));
    const winningState = winningStates.find(s => s.every(t => t !== null && t === s[0]));
    
    if (winningState) {
      setGameState(winningState[0] === "X" ? 1 : 2);
      winningState[0] === "X" ? incrementXScore() : incrementOScore();
    }
  }

  const handleUpdate = (index: number) => {
    if (gameState !== 0) {
      Alert.alert(
        "Are you sure?",
        "Do you want to restart the game?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { 
            text: "OK", 
            onPress: () => resetBoard(),
          }
        ]
      );
      return;
    }

    if (boardStates[index] !== null) {
      return;
    }

    const newStates = [...boardStates];
    newStates[index] = isCurrentPlayerX ? "X" : "O";

    checkWinner(newStates);

    setIsCurrentPlayerX(!isCurrentPlayerX);
    setBoardStates(newStates);
  }
  
  const goToSettings = () => {
    router.push("/settings");
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <BigSpacer />
        <Text style={{ color: theme.colors.text }} onPress={goToSettings}>Go To Settings</Text>
      <BigSpacer />
        <Scoreboard gameState={gameState} isCurrentPlayerX={isCurrentPlayerX} isThisForX={true} />
      <BigSpacer />
        <Board states={boardStates} gameState={gameState} onUpdate={handleUpdate} />
      <BigSpacer />
        <Scoreboard gameState={gameState} isCurrentPlayerX={isCurrentPlayerX} isThisForX={false} style={styles.upsideDown} />
      <BigSpacer />
        <Text style={{ color: theme.colors.text }} onPress={resetBoard}>Reset Board</Text>
      <BigSpacer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  upsideDown: {
    transform: [{ rotateY: "180deg" }, { rotateX: "180deg" }],
  }
});