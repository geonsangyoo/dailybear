// Standard
import React, { useState, useCallback, useLayoutEffect, useReducer } from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';

// Custom
import * as diaryActions from '../../store/actions/Diary';
import Diary from '../../constants/Diary';
import Background from '../../components/layout/Background';
import HeaderBackImage from '../../components/layout/HeaderBackImage';
import RectangleBox from '../../components/ui/RectangleBox';
import Colors from '../../constants/Colors';

const OPACITY = 0.2;
const DiaryIntroBackImage = require('../../assets/icons/close.png');

const DiaryDetail = props => {
    const INPUT_CHANGE = 'INPUT_CHANGE';
    const placeholder = Diary.placeholder;
    const dispatch = useDispatch();
    const [isValueInit, setIsValueInit] = useState(true);
    const [isCancelModalOpened, setIsCancelModalOpened] = useState(false);
    const diary = {};
    
    diary.content = useSelector(state => state.diary.content);
    diary.emotion = useSelector(state => state.diary.emotion);
    diary.date = useSelector(state => state.diary.date);

    // const editfg = ( diary.emotion ) !== '' ? true : false;
    const editfg = false;
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
                    setIsCancelModalOpened(true);
                }}
                    style={{ opacity: isCancelModalOpened ? OPACITY : 1 }}
                    disabled={ isCancelModalOpened ? true : false }
                >
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
                    disabled={ isCancelModalOpened ? true : false }
                    style={{ opacity: isCancelModalOpened ? OPACITY : 1 }}
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
        <View style={{ flex: 1 }}>
            <Background style={{ ...styles.container, opacity: isCancelModalOpened ? OPACITY : 1 }}>
                <View style={ styles.rectangleContainer }>
                    <RectangleBox style={ styles.rectangleBoxContainer }>
                        <View style={ styles.contentContainer }>
                            <TouchableOpacity
                                style={ styles.imageContainer }
                                disabled={ isCancelModalOpened ? true : false }
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
                            <ScrollView  bounces={ false }>
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
                            </ScrollView>
                        </View>
                    </RectangleBox>
                { 
                    editfg ?
                        <View style={ styles.footerContainer }>
                            <Pressable onPress={ () => {} } style={{ ...styles.diary_edit }}>
                                <Image 
                                    source={ Diary.footerIcons.EDIT.imgPath }
                                    style={ styles.icon }
                                />
                            </Pressable>
                            <Pressable onPress={ () => {} } style={{ ...styles.diary_share }}>
                                <Image 
                                    source={ Diary.footerIcons.SHARE.imgPath }
                                    style={ styles.icon }
                                />
                            </Pressable>
                            <Pressable onPress={ () => {} } style={{ ...styles.diary_delete }}>
                                <Image 
                                    source={ Diary.footerIcons.DELETE.imgPath }
                                    style={ styles.icon }
                                />
                            </Pressable>
                            <Pressable onPress={ () => {} } style={{ ...styles.diary_left }}>
                                <Image 
                                    source={ Diary.footerIcons.LEFT.imgPath }
                                    style={ styles.icon }
                                />
                            </Pressable>
                            <Pressable onPress={ () => {} } style={{ ...styles.diary_right }}>
                                <Image 
                                    source={ Diary.footerIcons.RIGHT.imgPath }
                                    style={ styles.icon }
                                />
                            </Pressable>
                        </View>
                    : null
                }
                </View>
            </Background>
            {
                isCancelModalOpened ?
                    <RectangleBox style={ styles.rectangleBoxCloseModalContainer }>
                        <View style={ styles.cancelMessageContainer }>
                            <Text style={ styles.cancelModalTextStyle }>
                                { Diary.cancelMessage }
                            </Text>
                        </View>
                        <View style={ styles.cancelModalContainer }>
                            <Text onPress={() => {
                                setIsCancelModalOpened(false);
                            }}
                                style={ styles.cancelModalButtonTextStyle }>
                                Cancel
                            </Text>
                            <Text onPress={() => {
                                dispatch(diaryActions.initDiary());
                                props.navigation.goBack();
                            }} 
                                style={ styles.cancelModalButtonTextStyle }>
                                Close
                            </Text>
                        </View>
                    </RectangleBox>
                : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
    },
    cancelMessageContainer: {
        flex: 1,
        marginTop: 47
    },
    cancelModalContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        marginBottom: 17
    },
    imageContainer: {
    },
    rectangleContainer: {
        flex: 1
    },
    rectangleBoxContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        top: '13%',
        width: 335,
        height: 400,
        borderRadius: 1
    },
    rectangleBoxCloseModalContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '35%',
        width: 315,
        height: 166
    },
    footerContainer: {
        flexDirection: 'row',
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
        fontWeight: 'bold',
        textAlign: 'center'
    },
    cancelModalButtonTextStyle: {
        color: Colors.HeaderTitle_gray,
        fontSize: 14,
        fontFamily: 'SFProText-Bold',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 22,
        textAlign: 'center'
    },
    cancelModalTextStyle: {
        color: Colors.HeaderTitle_gray,
        fontSize: 15,
        fontFamily: 'SFProText-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
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
    diary_share: {
        marginLeft: 20
    },
    diary_delete: {
        marginLeft: 20
    },
    diary_left: {
        marginLeft: '45%'
    },
    diary_right: {
        marginLeft: 30
    },
    icon: {
        marginTop: 15,
        width: 24,
        height: 24,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DiaryDetail;