// Standard
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Custom
import Colors from '../../constants/Colors';

const RectangleBox = props => {
    return (
        <View style={{ ...styles.RectangleBox, ...props.style }}>
            { props.children }
        </View>
    );
};

const styles = StyleSheet.create({
    RectangleBox: {
        marginLeft: 20,
        marginRight: 20,
        width: 335,
        height: 340,
        backgroundColor: Colors.DiaryRectangleBox_background,
        shadowOpacity: 0.5,
        shadowOffset: { width: 3, height: 4 },
        shadowColor: Colors.DiaryRectangleBox_shadow,
        borderRadius: 1,
        elevation: 4
    }
});

export default RectangleBox;