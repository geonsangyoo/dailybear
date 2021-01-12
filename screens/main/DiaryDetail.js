// Standard
import React, { useState, useCallback, useLayoutEffect, useReducer } from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';

// Custom
import * as diaryActions from '../../store/actions/Diary';
import Diary from '../../constants/Diary';
import Background from '../../components/layout/Background';
import HeaderBackImage from '../../components/layout/HeaderBackImage';
import RectangleBox from '../../components/ui/RectangleBox';
import Colors from '../../constants/Colors';

const DiaryIntroBackImage = require('../../assets/icons/close.png');

const DiaryDetail = props => {
    const INPUT_CHANGE = 'INPUT_CHANGE';
    const placeholder = Diary.placeholder;
    const dispatch = useDispatch();
    const [isValueInit, setIsValueInit] = useState(true);
    const diary = {};
    
    diary.content = useSelector(state => state.diary.content);
    diary.emotion = useSelector(state => state.diary.emotion);
    diary.date = useSelector(state => state.diary.date);

    const editfg = ( diary.emotion ) !== '' ? true : false;
    if ((diary.emotion !== props.route.params?.emotion) && (props.route.params?.emotion !== undefined)) {
        diary.emotion = props.route.params?.emotion;
    }
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
        value: diary.content
    });

    // if content data exists, it is replaced with init textinput
    if (isValueInit && diary.content !== '') {
        inputState.value = diary.content;
        setIsValueInit(false);
    }

    const saveModeHandler = useCallback(() => {
        dispatch(diaryActions.saveDiary(
                                diary.date.year,
                                diary.date.month,
                                diary.date.date,
                                diary.date.day,
                                inputState.value,
                                diary.emotion
                            ));
        dispatch(diaryActions.initDiary());
        props.navigation.navigate("CalendarView");
    }, [inputState.value, diary.emotion]);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => {
                    dispatch(diaryActions.initDiary());
                    props.navigation.goBack();
                }}>
                    <HeaderBackImage
                        imagePath={ DiaryIntroBackImage }
                    />
                </Pressable>
            ),
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

    if (diary.emotion === '') {
        return (
            <Background style={ styles.container }>
                <View style={ styles.centered }>
                    <ActivityIndicator size='large' color={ Colors.HeaderTitle_gray } />
                </View>
            </Background>
        );
    }

    return (
        <Background style={ styles.container }>
            <RectangleBox style={ styles.rectangleBoxContainer }>
                <View style={ styles.contentContainer }>
                    <TouchableOpacity
                        style={ styles.imageContainer }
                        onPress={
                            () => { 
                                props.navigation.navigate("DiaryIntro");
                        }}
                    >
                        <Image
                            style={ styles.image }
                            source={ Diary.emotionBears[diary.emotion].imgPath }
                        />
                    </TouchableOpacity>
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
                editfg ?
                    <View style={ styles.footerContainer }>
                        <TouchableOpacity onPress={ () => {} } style={{ ...styles.diary_edit }}>
                            <Image 
                                source={ Diary.footerIcons.EDIT.imgPath }
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
    contentContainer: {
        flex: 1
    },
    imageContainer: {
    },
    rectangleBoxContainer: {
        alignSelf: 'center',
        top: '12%',
        width: 335,
        height: 340,
        borderRadius: 1
    },
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: '8%',
        marginLeft: '8%',
        marginRight: '8%'
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
    description: {
        alignSelf: 'center',
        width: 295,
        height: 134
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
        width: 95,
        height: 87.5,
        alignSelf: 'center',
        marginTop: 55,
        marginBottom: 18,
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
        marginLeft: 20
    },
    edit_circle: {
        marginLeft: '40%'
    },
    icon: {
        width: 24,
        height: 24,
        marginTop: 15,
        marginLeft: 15
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DiaryDetail;