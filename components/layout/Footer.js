// Standard
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';

// Custom
import * as diaryActions from '../../store/actions/Diary';
import * as calendarConsts from '../../constants/Calendar';
import Colors from '../../constants/Colors';

const Footer = props => {
    const today = new Date();
    const dispatch = useDispatch();
    return (
        <View style={ styles.container }>
            <TouchableOpacity onPress={() => {} } style={{ ...styles.calendar_circle, ...styles.shadow }}>
                <Image 
                    source={ require('../../assets/icons/calender.png') }
                    style={ styles.icon }
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {} } style={{ ...styles.setting_circle, ...styles.shadow }}>
                <Image 
                    source={ require('../../assets/icons/setting.png') }
                    style={ styles.icon }
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                dispatch(diaryActions.loadDiary(
                    today.getFullYear(),
                    today.getMonth() + 1,
                    today.getDate(),
                    calendarConsts.weekDaysLong[today.getDay()]
                ));
                if (props.emotions[today.getDate() - 1].emotion !== -1) {
                    props.parentProps.navigation.navigate("DiaryDetail");
                } else {
                    props.parentProps.navigation.navigate("DiaryIntro");
                }
            }} style={{ ...styles.edit_circle, ...styles.shadow }}>
                <Image 
                    source={ require('../../assets/icons/edit.png') }
                    style={ styles.icon }
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: '8%',
        marginLeft: '8%',
        marginRight: '8%'
    },
    shadow: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 8,
        elevation: 5
    },
    calendar_circle: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
        backgroundColor: Colors.FooterIconBackground_white
    },
    setting_circle: {
        width: 60,
        height: 60,
        marginLeft: 20,
        borderRadius: 60/2,
        backgroundColor: Colors.FooterIconBackground_white
    },
    edit_circle: {
        width: 60,
        height: 60,
        marginLeft: '40%',
        borderRadius: 60/2,
        backgroundColor: Colors.FooterIconBackground_brown
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 15,
        marginLeft: 15
    }
});

export default Footer;