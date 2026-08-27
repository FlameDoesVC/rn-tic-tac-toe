import { View } from "react-native";
import { useTheme } from "../providers/_ThemeContext";
import HorizontalDivider from "./HorizontalDivider";
import TicTacButton from "./TicTacButton";
import VerticalDivider from "./VerticalDivider";

export default function Board({ states, gameState, onUpdate }: { states: (string | null)[], gameState: number, onUpdate: (index: number) => void }) {
    const { theme } = useTheme();
    // const borderColor = "#E0E0E0";
    // const borderColor = "#3a3a3a";
    const borderColor = theme.colors.text;
    const thickness = 1;
    const marginHorizontal = 9.5;

    function handleButtonPress(index: number) {
        // alert(`Button at index ${index} pressed!`);
        onUpdate(index);
    }

    return <View style={{ flexDirection: "column", flexWrap: "nowrap", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <View style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center", width: "100%"}}>
            <TicTacButton state={states[0]} gameState={gameState} onPress={() => handleButtonPress(0)} />
                <VerticalDivider color={borderColor} thickness={thickness} marginHorizontal={marginHorizontal} />
            <TicTacButton state={states[1]} gameState={gameState} onPress={() => handleButtonPress(1)} />
                <VerticalDivider color={borderColor} thickness={thickness} marginHorizontal={marginHorizontal} />
            <TicTacButton state={states[2]} gameState={gameState} onPress={() => handleButtonPress(2)} />
        </View>
        <HorizontalDivider color={borderColor} thickness={thickness} marginVertical={10} />
        <View style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <TicTacButton state={states[3]} gameState={gameState} onPress={() => handleButtonPress(3)} />
                <VerticalDivider color={borderColor} thickness={thickness} marginHorizontal={marginHorizontal} />
            <TicTacButton state={states[4]} gameState={gameState} onPress={() => handleButtonPress(4)} />
                <VerticalDivider color={borderColor} thickness={thickness} marginHorizontal={marginHorizontal} />
            <TicTacButton state={states[5]} gameState={gameState} onPress={() => handleButtonPress(5)} />
        </View>
        <HorizontalDivider color={borderColor} thickness={thickness} marginVertical={10} />
        <View style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <TicTacButton state={states[6]} gameState={gameState} onPress={() => handleButtonPress(6)} />
                <VerticalDivider color={borderColor} thickness={thickness} marginHorizontal={marginHorizontal} />
            <TicTacButton state={states[7]} gameState={gameState} onPress={() => handleButtonPress(7)} />
                <VerticalDivider color={borderColor} thickness={thickness} marginHorizontal={marginHorizontal} />
            <TicTacButton state={states[8]} gameState={gameState} onPress={() => handleButtonPress(8)} />
        </View>
    </View>;
}