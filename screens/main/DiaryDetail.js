// Standard
import React, { useCallback, useLayoutEffect, useReducer } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Custom
import * as diaryActions from '../../store/actions/Diary';
import Diary from '../../constants/Diary';
import Background from '../../components/layout/Background';
import RectangleBox from '../../components/ui/RectangleBox';
import Colors from '../../constants/Colors';

const DiaryDetail = props => {
    const INPUT_CHANGE = 'INPUT_CHANGE';
    const placeholder = Diary.placeholder;
    const dispatch = useDispatch();
    const diary = {
        content: useSelector(state => state.diary.content),
        emotion: useSelector(state => state.diary.emotion),
        date: useSelector(state => state.diary.date),
        day: useSelector(state => state.diary.day)
    };
    const dateString = Diary.convertDate(diary.date.year, diary.date.month, diary.date.date, diary.date.day);
    
    const inputReducer = (state, action) => {
        switch (action.type) {
            case INPUT_CHANGE:
                return {
                    ...state,
                    value: action.value
                };
            default:
                return state;
        }
    };

    const [inputState, dispatchInput] = useReducer(inputReducer, {
        value: diary.content ? diary.content : ''
    })

    const saveModeHandler = useCallback(() => {
        dispatch(diaryActions.saveDiary(date.year, date.month, date.date, inputState.value, diary.emotion));
        props.navigation.navigate("CalendarView");
    }, [mode, inputState.value]);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Button
                    title='Save'
                    type='clear'
                    titleStyle={ styles.headerRightText }
                    onPress={ saveModeHandler }
                />
            ),
            headerRightContainerStyle: styles.headerRightContainer
        });
    });

    return (
        <Background style={ styles.container }>
            <RectangleBox style={ styles.rectangleBoxContainer }>
                <View style={ styles.contentContainer }>
                    <Image 
                        style={ styles.image }
                        source={ Diary.emotionBears[(diary.emotion) ? (diary.emotion) : (props.route.params?.emotion)].imgPath }
                    />
                    <Text style={ styles.dateTextStyle }>
                        { dateString }
                    </Text>
                    <View style={ styles.description }>
                            <TextInput
                                style={ styles.input }  
                                editable={ true }
                                multiline={ true }
                                onChangeText={(text) => { 
                                    dispatchInput({
                                        type: INPUT_CHANGE,
                                        value: text
                                    });
                                }}
                                value={ inputState.value }
                                placeholder={ placeholder }
                                keyboardType='default'
                            />
                    </View>
                </View>
            </RectangleBox>
            { 
                diary.emotion ?
                    <View style={ styles.footerContainer }>
                        <TouchableOpacity onPress={ () => {} } style={{ ...styles.diary_edit }}>
                            <Image 
                                source={ Diary.footerIcons.UPLOAD.imgPath }
                                style={ styles.icon }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => {} } style={{ ...styles.diary_upload }}>
                            <Image 
                                source={ Diary.footerIcons.UPLOAD.imgPath }
                                style={ styles.icon }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => {} } style={{ ...styles.diary_delete }}>
                            <Image 
                                source={ Diary.footerIcons.DELETE.imgPath }
                                style={ styles.icon }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => {} } style={{ ...styles.diary_left }}>
                            <Image 
                                source={ Diary.footerIcons.LEFT.imgPath }
                                style={ styles.icon }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => {} } style={{ ...styles.diary_right }}>
                            <Image 
                                source={ Diary.footerIcons.RIGHT.imgPath }
                                style={ styles.icon }
                            />
                        </TouchableOpacity>
                    </View>
                : null
            }
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rectangleBoxContainer: {
        flex: 4,
        alignSelf: 'center',
        marginTop: 15
    },
    footerContainer: {
        flex: 1,
        marginTop: 24
    },
    textContainer: {
        flex: 1,
        top: '12%'
    },
    dateTextStyle: {
        color: Colors.HeaderTitle_gray,
        fontSize: 13,
        fontFamily: 'SFProText-Bold',
        fontStyle: 'normal',
        fontWeight: '900',
        textAlign: 'center'
    },
    diaryTextContainer: {
        top: '10%',
        width: '80%',
        height: '20%',
        margin: 20,
        alignSelf: 'center'
    },
    input: {
        margin: 20,
        textAlign: 'center'
    },
    image: {
        width: 76,
        height: 70,
        marginHorizontal: 18
    },
    headerRightContainer: {
        marginRight: 14
    },
    headerRightText: {
        color: Colors.HeaderTitle_gray,
        fontSize: 17
    },
    diary_edit: {
    },
    diary_upload: {
        marginLeft: 30
    },
    diary_delete: {
        marginLeft: 30
    },
    diary_left: {
        marginRight: 30
    },
    diary_right: {
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

export default DiaryDetail;