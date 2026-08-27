import { useWindowDimensions, View } from "react-native";

export default function BigSpacer() {
  const { height } = useWindowDimensions();

  const spacerHeight = height * 0.1;

    return <View style={{ height: spacerHeight }}></View>;
}