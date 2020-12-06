// Standard
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const Background = props => {
    return (
        <View style={ styles.container }>
            <ImageBackground
                source={ require('../../assets/images/background.png') }
                style={ styles.image }
            >
                { props.children }
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    image: {
        flex: 1,
        resizeMode: 'cover'
    }
});

export default Background;