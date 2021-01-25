// Standard
import React, { useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView, Image, Pressable, Alert, Animated, Dimensions, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Custom
import Background from '../../components/layout/Background';
import Header from '../../components/layout/Header';
import Calendar from '../../components/main/Calendar';
import Footer from '../../components/layout/Footer';
import * as diaryActions from '../../store/actions/Diary';
import * as calendarActions from '../../store/actions/Calendar';
import * as sayingActions from '../../store/actions/Saying';
import * as funcs from '../../helpers/funcs';
import * as calendarConsts from '../../constants/Calendar';
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
    const maxDays = funcs.getMaxDays(isDate.getFullYear(), isDate.getMonth());
    const dispatch = useDispatch();
    const diary = {};
    
    diary.content = useSelector(state => state.diary.content);
    diary.emotion = useSelector(state => state.diary.emotion);
    diary.date = useSelector(state => state.diary.date);
    
    const dateString = (Object.keys(diary.date).length > 0) 
                        ? Diary.convertDate(diary.date.year, diary.date.month, diary.date.date, diary.date.day)
                        : '';
    
    // Animation
    const animationDelay = 200;
    const animationThreshold = 0;
    const scrollY = useRef(new Animated.Value(0)).current;
    const yPositionMin = Dimensions.get("screen").height * -1;
    const yPositionMax = Dimensions.get("screen").height;
    const yPositionInit = new Animated.Value(0);
    
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
            speed: 5,
            bounciness: 5,
            useNativeDriver: true
        }).start();
    };

    const swipeDownAnimationAfter = () => {
        isDate.setMonth(isDate.getMonth() - 1);
        loadHandler(new Date(+isDate));
        scrollY.setValue(yPositionMin);
        Animated.spring(scrollY, {
            toValue: yPositionInit,
            speed: 5,
            bounciness: 5,
            useNativeDriver: true
        }).start();
    };

    return (
        <View style={{ flex: 1 }}>
            <Background style={{ ...styles.container, opacity: isDiaryDetailed ? Diary.opacity : 1 }}>
                <SafeAreaView style={ styles.container }>
                    <Animated.ScrollView
                        style={{ ...styles.gestureHandler, transform: [{ translateY: scrollY }] }}
                        onScroll={
                            Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                                { listener: (event) => {
                                    if (event.nativeEvent.contentOffset.y > animationThreshold) {
                                        Animated.spring(scrollY, {
                                            toValue: yPositionMin,
                                            speed: 5,
                                            bounciness: 5,
                                            useNativeDriver: true
                                        }).start();
                                        setTimeout(() => {
                                            scrollY.stopAnimation(swipeUpAnimationAfter)
                                        }, animationDelay);
                                    }
                                    if (event.nativeEvent.contentOffset.y < (-1 * animationThreshold)) {
                                        Animated.spring(scrollY, {
                                            toValue: yPositionMax,
                                            speed: 5,
                                            bounciness: 5,
                                            useNativeDriver: true
                                        }).start();
                                        setTimeout(() => {
                                            scrollY.stopAnimation(swipeDownAnimationAfter)
                                        }, animationDelay);
                                    }
                                },
                                    useNativeDriver: true
                                }
                            )
                        }
                        scrollEventThrottle={ 0 }
                    >
                        <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={ true }/>
                        <Header getDate={ isDate } parentProps={ props } saying={ saying } mode={ mode }/>
                        <Calendar getDate={ isDate } diaryHandler={ diaryHandler } parent={ this }/>
                    </Animated.ScrollView>
                    <Footer parentProps={ props } parent={ this } diaryHandler={ diaryHandler }/>
                </SafeAreaView>
            </Background>
            {
                (isDiaryDetailed && Object.keys(diary.date).length > 0) ?
                    <View style={ styles.diaryDetailContainer }>
                        <RectangleBox style={ styles.diaryDetailRectangleContainer }>
                            <View style={ styles.contentContainer }>
                                <View style={ styles.imageContainer }>
                                    <Image
                                        style={ styles.image }
                                        source={ diary.emotion !== "" ? Diary.emotionBears[diary.emotion].imgPath : null }
                                    />
                                </View>
                                <Text style={ styles.dateTextStyle }>
                                    { dateString }
                                </Text>
                                <ScrollView bounces={ false }>
                                    <View style={ styles.description }>
                                            <Text style={ styles.input }>
                                                { diary.emotion !== "" ? diary.content : '' }
                                            </Text>
                                    </View>
                                </ScrollView>
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
                                if (ytd.getMonth() !== isDate.getMonth()) {
                                    isDate.setMonth(isDate.getMonth() - 1);
                                    loadHandler(new Date(+isDate));
                                }
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
                                if (ytd.getMonth() !== isDate.getMonth()) {
                                    isDate.setMonth(isDate.getMonth() + 1);
                                    loadHandler(new Date(+isDate));
                                }
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
    gestureHandler: {
        height: '100%',
    },
    contentContainer: {
        flex: 1,
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
        width: 95,
        height: 87.5,
        alignSelf: 'center',
        marginTop: 55,
        marginBottom: 18,
        marginHorizontal: 18
    },
    dateTextStyle: {
        color: Colors.HeaderTitle_gray,
        fontSize: 13,
        fontFamily: 'SFProText-Bold',
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    description: {
        alignSelf: 'center',
        width: 295,
        height: 192
    },
    input: {
        margin: 20,
        textAlign: 'center'
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