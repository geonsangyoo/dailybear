// Standard
import React, { useEffect, useRef, useLayoutEffect, useCallback, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, Pressable, Alert, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

// Custom
import Background from '../../components/layout/Background';
import Header from '../../components/layout/Header';
import Calendar from '../../components/main/Calendar';
import Footer from '../../components/layout/Footer';
import * as diaryActions from '../../store/actions/Diary';
import * as calendarActions from '../../store/actions/Calendar';
import * as sayingActions from '../../store/actions/Saying';
import * as settingsAction from '../../store/actions/Settings';
import * as funcs from '../../helpers/funcs';
import * as calendarConsts from '../../constants/Calendar';
import SettingConstants from '../../constants/Setting';
import sayingConsts from '../../constants/Saying';
import RectangleBox from '../../components/ui/RectangleBox';
import HeaderBackImage from '../../components/layout/HeaderBackImage';
import Diary from '../../constants/Diary';
import Colors from '../../constants/Colors';

const DiaryIntroBackImage = require('../../assets/icons/close.png');

const CalendarView = props => {

    // Calendar Rendering
    const isDate = useSelector(state => state.calendar.activeDate);
    const isDiaryDetailed = useSelector(state => state.calendar.isDiaryDetailed);
    const saying = useSelector(state => state.saying.saying);
    const mode = useSelector(state => state.saying.mode);
    const checkEmotionChanged = useSelector(state => state.diary.emotion);
    const fontNameSetting = useSelector(state => state.settings.fontName);
    const maxDays = funcs.getMaxDays(isDate.getFullYear(), isDate.getMonth());
    const dispatch = useDispatch();
    const diary = {};
    
    diary.content = useSelector(state => state.diary.content);
    diary.emotion = useSelector(state => state.diary.emotion);
    diary.date = useSelector(state => state.diary.date);
    
    const dateString = (Object.keys(diary.date).length > 0) 
                        ? Diary.convertDate(diary.date.year, diary.date.month, diary.date.date, diary.date.day)
                        : '';
    
    // Animation (Swipe)
    const animationDelay = 80;
    const animationThreshold = Dimensions.get("screen").height / 8;
    const yPositionMin = Dimensions.get("screen").height * -1;
    const yPositionMax = Dimensions.get("screen").height;
    const yPositionInit = new Animated.Value(0);
    const scrollY = useRef(new Animated.Value(0)).current;

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


    useEffect(() => {
        // Load Setting
        dispatch(settingsAction.loadSetting());
    }, []);

    useEffect(() => {
        // Load Saying
        dispatch(sayingActions.loadSaying(isDate.getFullYear(), parseInt(isDate.getMonth()) + 1));
        // Load Emotions
        dispatch(calendarActions.loadEmotions(isDate.getFullYear(), isDate.getMonth() + 1, maxDays));
    }, [isDate]);

    useEffect(() => {
        // Load Emotions when any changes occurred
        if (!isDiaryDetailed) {
            dispatch(calendarActions.loadEmotions(isDate.getFullYear(), isDate.getMonth() + 1, maxDays));
        }
    }, [checkEmotionChanged]);

    useEffect(() => {
        (
            mode === sayingConsts.randomMode &&
            saying === ""
        ) ?
            dispatch(sayingActions.loadSayingFromOuter(isDate.getFullYear(), parseInt(isDate.getMonth()) + 1))
            : dispatch(sayingActions.loadSaying(isDate.getFullYear(), parseInt(isDate.getMonth()) + 1));
    }, [mode]);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => (
                isDiaryDetailed ?
                <Pressable onPress={() => {
                    dispatch(calendarActions.setIsDiaryDetailed(false));
                    dispatch(diaryActions.initDiary());
                }}
                >
                    <HeaderBackImage
                        imagePath={ DiaryIntroBackImage }
                    />
                </Pressable> : null
            )
        });
    });

    const loadHandler = useCallback((isDate) => {
        dispatch(calendarActions.setActiveDate(isDate));
    }, [dispatch, isDate]);

    const diaryHandler = (year, month, date, day, emotion) => {
        dispatch(diaryActions.loadDiary(
            year,
            month,
            date,
            day
        ));
        if (emotion !== -1) {
            dispatch(calendarActions.setIsDiaryDetailed(true));
        } else {
            props.navigation.navigate("DiaryIntro");
        }
    };

    const deleteAlertDialog = () => {
        Alert.alert(
            "Delete diary",
            Diary.deleteMessage,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => { 
                        dispatch(diaryActions.removeDiary(diary.date.year, diary.date.month, diary.date.date));
                        dispatch(calendarActions.setIsDiaryDetailed(false));
                        dispatch(diaryActions.initDiary());
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const swipeUpAnimationAfter = () => {
        isDate.setMonth(isDate.getMonth() + 1);
        loadHandler(new Date(+isDate));
        scrollY.setValue(yPositionMax);
        Animated.spring(scrollY, {
            toValue: yPositionInit,
            speed: 20,
            bounciness: 2,
            useNativeDriver: true
        }).start();
    };

    const swipeDownAnimationAfter = () => {
        isDate.setMonth(isDate.getMonth() - 1);
        loadHandler(new Date(+isDate));
        scrollY.setValue(yPositionMin);
        Animated.spring(scrollY, {
            toValue: yPositionInit,
            speed: 20,
            bounciness: 2,
            useNativeDriver: true
        }).start();
    };

    return (
        <View style={{ flex: 1 }}>
            <Background style={{ ...styles.container, opacity: isDiaryDetailed ? Diary.opacity : 1 }}>
                <SafeAreaView style={ styles.container }>
                    <View style={ styles.gestureContainer }>
                        <Animated.ScrollView
                            style={{ transform: [{ translateY: scrollY }] }}
                            onScrollEndDrag={
                                Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                                    { listener: (event) => {
                                        if (event.nativeEvent.contentOffset.y > animationThreshold) {
                                            scrollY.setValue(-1 * event.nativeEvent.contentOffset.y)
                                            Animated.spring(scrollY, {
                                                toValue: yPositionMin,
                                                speed: 20,
                                                bounciness: 2,
                                                useNativeDriver: true,

                                            }).start();
                                            setTimeout(() => {
                                                scrollY.stopAnimation(swipeUpAnimationAfter)
                                            }, animationDelay);
                                        }
                                        else if (event.nativeEvent.contentOffset.y < (-1 * animationThreshold)) {
                                            scrollY.setValue(-1 * event.nativeEvent.contentOffset.y)
                                            Animated.spring(scrollY, {
                                                toValue: yPositionMax,
                                                speed: 20,
                                                bounciness: 2,
                                                useNativeDriver: true
                                            }).start();
                                            setTimeout(() => {
                                                scrollY.stopAnimation(swipeDownAnimationAfter)
                                            }, animationDelay);
                                        }
                                        else {
                                            // Back to the starting coord.
                                            scrollY.setValue(0)
                                        }
                                    },
                                        useNativeDriver: true
                                    }
                                )
                            }
                            scrollEventThrottle={ 1 }
                        >
                            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={ true }/>
                            <Header getDate={ isDate } parentProps={ props } saying={ saying } mode={ mode }/>
                            <Calendar getDate={ isDate } diaryHandler={ diaryHandler } parent={ this }/>
                        </Animated.ScrollView>
                    </View>
                    <Footer parentProps={ props } parent={ this } diaryHandler={ diaryHandler }/>
                </SafeAreaView>
            </Background>
            {
                (isDiaryDetailed && Object.keys(diary.date).length > 0) ?
                    <View style={ styles.diaryDetailContainer }>
                        <RectangleBox style={ styles.diaryDetailRectangleContainer }>
                            <View style={ styles.contentContainer }>
                                <View style={ styles.imageContainer }>
                                    <Animated.Image
                                        style={[styles.image, emotionImgSizeStyle ]}
                                        source={ diary.emotion !== "" ? Diary.emotionBears[diary.emotion].imgPath : null }
                                    />
                                </View>
                                <Animated.Text Text style={{ ...styles.dateTextStyle, ...dateSizeStyle,
                                        fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}>
                                        { dateString }
                                </Animated.Text>
                                <Animated.ScrollView
                                    style={ styles.scrollViewContainer }
                                    bounces={ true }
                                    scrollEnabled={ true }
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
                                    scrollEventThrottle={ 1 }
                                >
                                    <View style={ styles.description }>
                                        <Text style={{ ...styles.input,
                                            fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}>
                                            { diary.emotion !== "" ? diary.content : '' }
                                        </Text>
                                    </View>
                                </Animated.ScrollView>
                            </View>
                        </RectangleBox>
                        <View style={ styles.footerContainer }>
                            <Pressable onPress={ () => {
                                if (diary.emotion !== "") {
                                    props.navigation.navigate("DiaryDetail");
                                } else {
                                    props.navigation.navigate("DiaryIntro");
                                }
                            }} style={{ ...styles.diary_edit }}>
                                <Image 
                                    source={ Diary.footerIcons.EDIT.imgPath }
                                    style={ styles.icon }
                                />
                            </Pressable>
                            <Pressable onPress={ () => {} }
                                    disabled={ diary.emotion === "" ? true : false }
                                    style={{ ...styles.diary_share, display: diary.emotion === "" ? 'none' : 'flex' }}>
                                <Image 
                                    source={ Diary.footerIcons.SHARE.imgPath }
                                    style={ styles.icon }
                                />
                            </Pressable>
                            <Pressable onPress={ deleteAlertDialog }
                                    disabled={ diary.emotion === "" ? true : false }
                                    style={{ ...styles.diary_delete, display: diary.emotion === "" ? 'none' : 'flex' }}>
                                <Image 
                                    source={ Diary.footerIcons.DELETE.imgPath }
                                    style={ styles.icon }
                                />
                            </Pressable>
                            <Pressable onPress={ () => {
                                let ytd = new Date();
                                ytd.setFullYear(diary.date.year, diary.date.month - 1, diary.date.date);
                                ytd.setDate(ytd.getDate() - 1);
                                dispatch(diaryActions.loadDiary(
                                    ytd.getFullYear(),
                                    ytd.getMonth() + 1,
                                    ytd.getDate(),
                                    calendarConsts.weekDaysLong[ytd.getDay()]
                                ));
                                /** Hold
                                if (ytd.getMonth() !== isDate.getMonth()) {
                                    isDate.setMonth(isDate.getMonth() - 1);
                                    loadHandler(new Date(+isDate));
                                }
                                */
                            }} style={{ ...styles.diary_left }}>
                                <Image 
                                    source={ Diary.footerIcons.LEFT.imgPath }
                                    style={ styles.icon }
                                />
                            </Pressable>
                            <Pressable onPress={ () => {
                                let ytd = new Date();
                                ytd.setFullYear(diary.date.year, diary.date.month - 1, diary.date.date);
                                ytd.setDate(ytd.getDate() + 1);
                                dispatch(diaryActions.loadDiary(
                                    ytd.getFullYear(),
                                    ytd.getMonth() + 1,
                                    ytd.getDate(),
                                    calendarConsts.weekDaysLong[ytd.getDay()]
                                ));
                                /** Hold
                                if (ytd.getMonth() !== isDate.getMonth()) {
                                    isDate.setMonth(isDate.getMonth() + 1);
                                    loadHandler(new Date(+isDate));
                                }
                                */
                            }} style={{ ...styles.diary_right }}>
                                <Image 
                                    source={ Diary.footerIcons.RIGHT.imgPath }
                                    style={ styles.icon }
                                />
                            </Pressable>
                        </View>
                    </View>
                : null
            }
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden'
    },
    gestureContainer: {
        height: '80%',
        overflow: 'hidden',
    },
    contentContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    diaryDetailContainer: {
        alignSelf: 'center',
        position: 'absolute',
        top: '18%',
        width: '100%',
        height: '100%'
    },
    diaryDetailRectangleContainer: {
        width: 335,
        height: 400,
        alignSelf: 'center'
    },
    imageContainer: {
    },
    image: {
        alignSelf: 'center',
        marginBottom: 20,
        marginHorizontal: 18
    },
    dateTextStyle: {
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: Colors.HeaderTitle_gray,
        textAlign: 'center'
    },
    scrollViewContainer: {
        maxWidth: 230,
        maxHeight: 200,
        alignSelf: 'center',
    },
    description: {
        alignSelf: 'center',
        marginTop: 10,
    },
    input: {
        margin: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerContainer: {
        flexDirection: 'row',
        marginLeft: 40,
        marginRight: 40
    },
    diary_edit: {
        left: '0%'
    },
    diary_share: {
        marginLeft: 20
    },
    diary_delete: {
        marginLeft: 20
    },
    diary_left: {
        position: 'absolute',
        right: '15%'
    },
    diary_right: {
        position: 'absolute',
        right: '0%'
    },
    icon: {
        marginTop: 15,
        width: 24,
        height: 24
    },
});

export default CalendarView;
