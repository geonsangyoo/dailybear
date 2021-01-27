// Standard
import React from 'react';
import { View, Text, Image, StyleSheet, } from 'react-native';

// Custom
import Diary from '../../constants/Diary';
import Colors from '../../constants/Colors';

const List = props => {
    return (
        <View style={ styles.container }>
            <View style={ styles.contents }>
                <Text style={ styles.listViewText }>
                    { String(props.date).padStart(2, '0') }
                </Text>
                { (props.emotionTitle >= 0) ?
                    <Image 
                        source={ Diary.emotionBears[props.emotionTitle].imgPath }
                        style={ styles.image }
                    /> : null
                }
                <Text
                    style={ styles.listViewText }
                    numberOfLines={ 1 }
                >
                    { props.content }
                </Text>
            </View>
            <View style={ styles.line } />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
    },
    contents: {
        flexDirection: 'row',
        marginVertical: 30,
    },
    line: {
        marginHorizontal: 'auto',
        borderBottomWidth: 1,
        opacity: 0.1,
        borderBottomColor: Colors.ListView_gray
    },
    listViewText: {
        fontFamily: 'SFProText-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 12,
        color: Colors.ListView_text
    },
    image: {
        width: 28.5,
        height: 26.25
    }
});

export default List;