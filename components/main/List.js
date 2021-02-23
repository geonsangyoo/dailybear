// Standard
import React from 'react';
import { View, Text, Image, StyleSheet, } from 'react-native';
import { useSelector } from 'react-redux';

// Custom
import SettingConstants from '../../constants/Setting';
import Diary from '../../constants/Diary';
import Colors from '../../constants/Colors';

const List = props => {
    
    const fontNameSetting = useSelector(state => state.settings.fontName);

    return (
        <View style={ styles.container }>
            { (props.date === 1) ?
                <View style={ styles.line } /> : null
            }
            <View style={ styles.contents }>
                <Text style={{ ...styles.listViewText,
                    fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}>
                    { String(props.date).padStart(2, '0') }
                </Text>
                <Image 
                    source={ ( props.emotionTitle >= 0 ) ?
                        Diary.emotionBears[props.emotionTitle].imgPath :
                        Diary.emotionBears[Diary.emotionTitle.NONE].imgPath
                    }
                    style={ styles.image }
                />
                <Text style={{ ...styles.listViewText,
                    fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}
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
        marginHorizontal: 30,
    },
    contents: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    line: {
        marginHorizontal: 'auto',
        borderBottomWidth: 2,
        opacity: 0.1,
        borderBottomColor: Colors.ListView_gray
    },
    listViewText: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 12,
        color: Colors.ListView_text,
        marginVertical: 5,
    },
    image: {
        width: 28.5,
        height: 26.25,
        marginHorizontal: 15,
    }
});

export default List;
