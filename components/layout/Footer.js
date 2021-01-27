// Standard
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Custom
import * as diaryActions from '../../store/actions/Diary';
import * as calendarConsts from '../../constants/Calendar';
import Colors from '../../constants/Colors';

const Footer = props => {

    const today = new Date();
    const dispatch = useDispatch();
    const [isClicked, setIsClicked] = useState(false);
    const [viewMode, setViewMode] = useState(null);
    const [viewModeImgPath, setViewModeImgPath] = useState(null);
    const emotion = useSelector(state => state.diary.emotion);
    const date = useSelector(state => state.diary.date);

    useEffect(() => {
        console.log("route -> ", props.parentProps.route.name);
        switch (props.parentProps.route.name) {
            case "CalendarView":
                setViewMode("StatisticsView");
                setViewModeImgPath(require('../../assets/icons/calender.png'));
                break;
            case "StatisticsView":
                setViewMode("CalendarView");
                setViewModeImgPath(require('../../assets/icons/graph.png'));
                break;
            default:
                break;
        };
    }, [props.parentProps]);

    useEffect(() => {
        if (isClicked) {
            if (emotion !== "") {
                props.diaryHandler.call(
                    props.parent,
                    today.getFullYear(),
                    today.getMonth() + 1,
                    today.getDate(),
                    calendarConsts.weekDaysLong[today.getDay()],
                    emotion
                );
            } else {
                props.parentProps.navigation.navigate("DiaryIntro");
            }
            setIsClicked(false);
        }
    }, [date]);

    return (
        <View style={ styles.container }>
            <TouchableOpacity onPress={() => {
                props.parentProps.navigation.navigate(viewMode);
            }} style={{ ...styles.viewMode_circle, ...styles.shadow }}>
                <Image 
                    source={ viewModeImgPath }
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
                setIsClicked(true);
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
    viewMode_circle: {
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