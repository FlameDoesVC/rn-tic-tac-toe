import { useScore } from "@/providers/_ScoreContext";
import { useTheme } from "@/providers/_ThemeContext";
import { Text, useWindowDimensions, View } from "react-native";
import TicTacButton from "./TicTacButton";

export default function Scoreboard({ gameState, isCurrentPlayerX, isThisForX, style }: { gameState: number, isCurrentPlayerX: boolean, isThisForX: boolean, style?: any }) {
    const { height } = useWindowDimensions();
    const { theme } = useTheme();
    const { OScore, XScore } = useScore();

    const fontSize = height * 0.03;

    let score = isThisForX ? XScore : OScore;
    let text = score.toString();
    if ((gameState === 1 && isThisForX) || (gameState === 2 && !isThisForX)) {
        text = `${score - 1} + 1`
    }

    return <View style={[style, { flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }]}>
        <Text style={{ color: theme.colors.text, fontSize, marginBottom: 15 }}>{text}</Text>
        <TicTacButton state={isThisForX ? "X" : "O"} gameState={gameState !== 0 ? 0 : (isCurrentPlayerX == isThisForX ? 0 : 3)} onPress={() => {}} />
    </View>;
}