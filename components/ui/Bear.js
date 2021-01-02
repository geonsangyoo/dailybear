import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Bear = props => {
    let contents;
    if (props.isValid) {
        contents = (
            <TouchableOpacity onPress={ props.onPress }>
                <Image 
                    source={ require('../../assets/images/main_bear_1.png') }
                    style={ styles.image }
                />
            </TouchableOpacity>
        );
    } else {
        contents = (
            <Text></Text>
        );
    }
    return (
        <View style={ styles.container }>
            { contents }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 11,
    },
    image: {
        width: 38,
        height: 35
    }
});

export default Bear;