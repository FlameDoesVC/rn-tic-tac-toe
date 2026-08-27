import { StyleSheet, View } from 'react-native';

const VerticalDivider = ({ color = '#E0E0E0', thickness = StyleSheet.hairlineWidth, marginHorizontal = 10 }) => {
    return (
        <View
            style={{
                height: '100%',
                backgroundColor: color,
                width: thickness,
                marginHorizontal: marginHorizontal
            }}
        />
    );
};

export default VerticalDivider;
