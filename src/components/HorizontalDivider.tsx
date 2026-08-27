import { StyleSheet, useWindowDimensions, View } from 'react-native';
import QuadDivider from './QuadDivider';

const HorizontalDivider = ({ color = '#E0E0E0', thickness = StyleSheet.hairlineWidth, marginVertical = 10 }) => {
    const { width: screenWidth } = useWindowDimensions();

    const sq = screenWidth * 0.2;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View
                style={
                    {
                        backgroundColor: color,
                        height: thickness,
                        marginVertical: marginVertical,
                        width: sq
                    }
                }
            />
            <QuadDivider dividerColor={color} thickness={thickness} />
            <View
                style={
                    {
                        backgroundColor: color,
                        height: thickness,
                        marginVertical: marginVertical,
                        width: sq
                    }
                }
            />
            <QuadDivider dividerColor={color} thickness={thickness} />
            <View
                style={
                    {
                        backgroundColor: color,
                        height: thickness,
                        marginVertical: marginVertical,
                        width: sq
                    }
                }
            />
        </View>
    );
};

export default HorizontalDivider;