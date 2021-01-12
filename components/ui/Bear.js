// Standard
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Custom
import Diary from '../../constants/Diary';

const Bear = props => {
    let contents;
    if (props.isValid) {
        contents = (
            <TouchableOpacity onPress={ props.onPress }>
                <Image 
                    source={ Diary.emotionBears[props.emotionTitle].imgPath }
                    style={ styles.image }
                />
            </TouchableOpacity>
        );
    } else {
        contents = null;
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