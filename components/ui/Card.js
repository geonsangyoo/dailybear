// Standard
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>
            { props.children }
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0,
        shadowOffset: { width: 0, height: 0.5 },
        shadowRadius: 8,
        opacity: 0.6,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});

export default Card;