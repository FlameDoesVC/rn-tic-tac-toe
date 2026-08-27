import { StyleSheet, View } from 'react-native';

const QuadDivider = ({ dividerColor = '#E0E0E0', thickness = StyleSheet.hairlineWidth }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.quadrant} />
                <View style={styles.quadrant} />
            </View>

            <View style={styles.dividerOverlay} pointerEvents="none">
                <View style={[styles.horizontalLine, { backgroundColor: dividerColor, height: thickness }]} />
                <View style={[styles.verticalLine, { backgroundColor: dividerColor, width: thickness }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    quadrant: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dividerOverlay: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalLine: {
        width: '100%',
        position: 'absolute',
    },
    verticalLine: {
        height: '100%',
        position: 'absolute',
    },
});

export default QuadDivider;
