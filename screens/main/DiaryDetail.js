// Standard
import React, { useState, useCallback, useLayoutEffect, useReducer, useRef } from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Pressable, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';

// Custom
import * as calendarActions from '../../store/actions/Calendar';
import * as diaryActions from '../../store/actions/Diary';
import SettingConstants from '../../constants/Setting';
import Diary from '../../constants/Diary';
import Background from '../../components/layout/Background';
import HeaderBackImage from '../../components/layout/HeaderBackImage';
import RectangleBox from '../../components/ui/RectangleBox';
import Colors from '../../constants/Colors';
import InputScrollView from 'react-native-input-scroll-view';
import { captureScreen } from 'react-native-view-shot';

const DiaryIntroBackImage = require('../../assets/icons/close.png');

const DiaryDetail = props => {
    
    const INPUT_CHANGE = 'INPUT_CHANGE';
    const placeholder = Diary.placeholder;
    const fontNameSetting = useSelector(state => state.settings.fontName);
    const dispatch = useDispatch();
    const [isValueInit, setIsValueInit] = useState(true);
    const [isCancelModalOpened, setIsCancelModalOpened] = useState(false);
    const diary = {};
    
    diary.content = useSelector(state => state.diary.content);
    diary.emotion = useSelector(state => state.diary.emotion);
    diary.date = useSelector(state => state.diary.date);

    // Animation (Emotion Icon)
    const emotionTransitionDuration = 350;
    const emotionImgHeight = 10;
    const [emotionImgAnimationStarted, setEmotionImgAnimationStarted] = useState(false);
    const emotionLeftTransition = useRef(new Animated.Value(0)).current;
    const emotionScaleX = useRef(new Animated.Value(95)).current;
    const emotionScaleY = useRef(new Animated.Value(87.5)).current;
    const diaryScrollY = useRef(new Animated.Value(0)).current;
    const emotionImgSizeStyle = {
        width: emotionScaleX,
        height: emotionScaleY,
        transform: [
            {
                translateX: emotionLeftTransition
            }
        ]
    };

    // Animation (Date)
    const dateRightTransition = useRef(new Animated.Value(0)).current;
    const dateUpTransition = useRef(new Animated.Value(0)).current;
    const dateSizeStyle = {
        transform: [
            {
                translateX: dateRightTransition
            },
            {
                translateY: dateUpTransition
            }
        ]
    };

    if ((diary.emotion !== props.route.params?.emotion) && (props.route.params?.emotion !== undefined)) {
        diary.emotion = props.route.params?.emotion;
    }
    const dateString = (Object.keys(diary.date).length > 0) 
                        ? Diary.convertDate(diary.date.year, diary.date.month, diary.date.date, diary.date.day)
                        : '';

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
        let currDay = new Date();
        currDay.setFullYear(diary.date.year, diary.date.month - 1, diary.date.date);
        dispatch(diaryActions.saveDiary(
                                diary.date.year,
                                diary.date.month,
                                diary.date.date,
                                diary.date.day,
                                inputState.value,
                                diary.emotion
                            ));
        dispatch(calendarActions.setActiveDate(currDay));
        dispatch(calendarActions.setIsDiaryDetailed(false));
        props.navigation.navigate("CalendarView");
    }, [inputState.value, diary.emotion]);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => {
                    setIsCancelModalOpened(true);
                }}
                    style={{ opacity: isCancelModalOpened ? Diary.opacity : 1 }}
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
                    titleStyle={{ ...styles.headerRightText,
                        fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}
                    onPress={ saveModeHandler }
                    disabled={ isCancelModalOpened ? true : false }
                    style={{ opacity: isCancelModalOpened ? Diary.opacity : 1 }}
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
        <KeyboardAvoidingView
            style={ styles.container }
            behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
        >
            <Background style={{ ...styles.container, opacity: isCancelModalOpened ? Diary.opacity : 1 }}>
                <View style={ styles.rectangleContainer }>
                    <RectangleBox style={ styles.rectangleBoxContainer }>
                        <View style={ styles.contentInnerContainer }>
                            <TouchableOpacity
                                style={ styles.imageContainer }
                                disabled={ isCancelModalOpened ? true : false }
                                onPress={
                                    () => { 
                                        props.navigation.navigate("DiaryIntro");
                                }}
                            >
                                <Animated.Image
                                    style={[styles.image, emotionImgSizeStyle ]}
                                    source={ Diary.emotionBears[diary.emotion].imgPath }
                                />
                            </TouchableOpacity>
                            <Animated.Text style={{ ...styles.dateTextStyle, ...dateSizeStyle,
                                fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}>
                                { dateString }
                            </Animated.Text>
                            <InputScrollView
                                style={ styles.scrollBarContainer }
                                useAnimatedScrollView= { true }
                                bounces={ false }
                                scrollEventThrottle={ 1 }
                            >
                                <View style={ styles.description }>
                                    <TextInput
                                        style={{ ...styles.input,
                                            fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}  
                                        editable={ true }
                                        multiline={ true }
                                        onChangeText={(text) => { 
                                            dispatchInput({
                                                type: INPUT_CHANGE,
                                                value: text
                                            });
                                        }}
                                        onScroll={
                                            Animated.event(
                                                [{ nativeEvent: { contentOffset: { y: diaryScrollY }}}],
                                                { listener: (event) => {
                                                    if (!emotionImgAnimationStarted && event.nativeEvent.contentOffset.y > emotionImgHeight) {
                                                        setEmotionImgAnimationStarted(true);
                                                        Animated.timing(emotionScaleX, {
                                                            toValue: 46,
                                                            duration: emotionTransitionDuration,
                                                            useNativeDriver: false
                                                        }).start();
                                                        Animated.timing(emotionScaleY, {
                                                            toValue: 40,
                                                            duration: emotionTransitionDuration,
                                                            useNativeDriver: false
                                                        }).start();
                                                        Animated.timing(emotionLeftTransition, {
                                                            toValue: -53,
                                                            duration: emotionTransitionDuration,
                                                            useNativeDriver: false
                                                        }).start();
                                                        Animated.timing(dateUpTransition, {
                                                            toValue: -45,
                                                            duration: emotionTransitionDuration,
                                                            useNativeDriver: false
                                                        }).start();
                                                        Animated.timing(dateRightTransition, {
                                                            toValue: 35,
                                                            duration: emotionTransitionDuration,
                                                            useNativeDriver: false
                                                        }).start();
                                                    }
        
                                                    if (emotionImgAnimationStarted && event.nativeEvent.contentOffset.y < emotionImgHeight) {
                                                        setEmotionImgAnimationStarted(false);
                                                        Animated.timing(emotionScaleX, {
                                                            toValue: 95,
                                                            duration: emotionTransitionDuration,
                                                            useNativeDriver: false
                                                        }).start();
                                                        Animated.timing(emotionScaleY, {
                                                            toValue: 87.5,
                                                            duration: emotionTransitionDuration,
                                                            useNativeDriver: false
                                                        }).start();
                                                        Animated.timing(emotionLeftTransition, {
                                                            toValue: 0,
                                                            duration: emotionTransitionDuration,
                                                            useNativeDriver: false
                                                        }).start();
                                                        Animated.timing(dateUpTransition, {
                                                            toValue: 0,
                                                            duration: emotionTransitionDuration,
                                                            useNativeDriver: false
                                                        }).start();
                                                        Animated.timing(dateRightTransition, {
                                                            toValue: 0,
                                                            duration: emotionTransitionDuration,
                                                            useNativeDriver: false
                                                        }).start();
                                                    }
                                                },
                                                    useNativeDriver: false
                                                }
                                            )
                                        }
                                        value={ inputState.value }
                                        placeholder={ placeholder }
                                        keyboardType='default'
                                    />
                                </View>
                            </InputScrollView>
                        </View>
                    </RectangleBox>
                    <View>
                        <Image

                        />
                    </View>
                </View>
            </Background>
            {
                isCancelModalOpened ?
                    <RectangleBox style={ styles.rectangleBoxCloseModalContainer }>
                        <View style={ styles.cancelMessageContainer }>
                            <Text style={{ ...styles.cancelModalTextStyle,
                                fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}>
                                { Diary.cancelMessage }
                            </Text>
                        </View>
                        <View style={ styles.cancelModalContainer }>
                            <Text onPress={() => {
                                setIsCancelModalOpened(false);
                            }}
                                style={{ ...styles.cancelModalButtonTextStyle,
                                fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}>
                                Cancel
                            </Text>
                            <Text onPress={() => {
                                props.navigation.goBack();
                            }} 
                                style={{ ...styles.cancelModalButtonTextStyle,
                                fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}>
                                Close
                            </Text>
                        </View>
                    </RectangleBox>
                : null
            }
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        overflow: 'hidden'
    },
    contentInnerContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
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
        alignSelf: 'center',
        position: 'absolute',
        top: '15%',
        width: '100%',
        height: '80%',
        overflow: 'hidden',
    },
    rectangleBoxContainer: {
        width: 335,
        height: 400,
        alignSelf: 'center'
    },
    rectangleBoxCloseModalContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '35%',
        width: 315,
        height: 166
    },
    scrollBarContainer: {
        marginTop: 20,
    },
    textContainer: {
        flex: 1,
        top: '12%'
    },
    dateTextStyle: {
        color: Colors.HeaderTitle_gray,
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    cancelModalButtonTextStyle: {
        color: Colors.HeaderTitle_gray,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 22,
        textAlign: 'center'
    },
    cancelModalTextStyle: {
        color: Colors.HeaderTitle_gray,
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center'
    },
    description: {
        alignSelf: 'center',
        width: 250,
        maxHeight: 200,
    },
    input: {
        maxWidth: 230,
        marginHorizontal: 30,
    },
    image: {
        alignSelf: 'center',
        marginBottom: 20,
        marginHorizontal: 18
    },
    headerRightContainer: {
        marginRight: 14
    },
    headerRightText: {
        color: Colors.HeaderTitle_gray,
        fontSize: 17
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DiaryDetail;
