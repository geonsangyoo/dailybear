// Standard
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

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
        flex: 1
    },
    image: {
        width: 40,
        height: 40
    }
});

export default Bear;
