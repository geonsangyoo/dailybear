// Standard
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, StatusBar, Dimensions, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  clockRunning,
  cond,
  debug,
  eq,
  not,
  set,
  call,
  useCode,
  Value,
  Easing,
} from "react-native-reanimated";
import {
  snapPoint,
  timing,
  useClocks,
  usePanGestureHandler,
  useValue,
} from "react-native-redash/lib/module/v1";

// Custom
import Background from '../../components/layout/Background';
import Header from '../../components/layout/Header';
import Calendar from '../../components/main/Calendar';
import Footer from '../../components/layout/Footer';
import * as diaryActions from '../../store/actions/Diary';
import * as calendarActions from '../../store/actions/Calendar';
import * as sayingActions from '../../store/actions/Saying';
import * as funcs from '../../helpers/funcs';
import sayingConsts from '../../constants/Saying';
import RectangleBox from '../../components/ui/RectangleBox';
import Diary from '../../constants/Diary';
import Colors from '../../constants/Colors';

const CalendarView = props => {
    // State
    const [isDiaryDetailOpened, setIsDiaryDetailOpened] = useState(false);

    // Calendar Rendering
    const isDate = useSelector(state => state.calendar.activeDate);
    const saying = useSelector(state => state.saying.saying);
    const mode = useSelector(state => state.saying.mode);
    const checkEmotionChanged = useSelector(state => state.diary.emotion);
    const emotions = useSelector(state => state.calendar.emotions);
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
    const { height } = Dimensions.get('window');
    const [clock, clock2] = useClocks(2);
    const offsetY = useValue(0);
    const translateY = useValue(0);
    const swipeUpY = new Value(-height);
    const swipeDownY = new Value(height);
    const swipeNoneY = new Value(0);
    const renderCalendarCallFg = useValue(1);
    const offFlag = new Value(0);
    const onFlag = new Value(1);
    const {
        gestureHandler,
        state,
        velocity,
        translation
    } = usePanGestureHandler();
    const snapPoints = [-height, 0, height];
    const to = snapPoint(translateY, velocity.y, snapPoints)

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            dispatch(diaryActions.initDiary());
        });
    }, []);

    useEffect(() => {
        // Load Saying
        dispatch(sayingActions.loadSaying(isDate.getFullYear(), parseInt(isDate.getMonth()) + 1));
        // Load Emotions
        dispatch(calendarActions.loadEmotions(isDate.getFullYear(), isDate.getMonth() + 1, maxDays));
    }, [isDate]);

    useEffect(() => {
        // Load Emotions when changed
        dispatch(calendarActions.loadEmotions(isDate.getFullYear(), isDate.getMonth() + 1, maxDays));
    }, [checkEmotionChanged]);

    useEffect(() => {
        (
            mode === sayingConsts.randomMode &&
            saying === ""
        ) ?
            dispatch(sayingActions.loadSayingFromOuter(isDate.getFullYear(), parseInt(isDate.getMonth()) + 1))
            : dispatch(sayingActions.loadSaying(isDate.getFullYear(), parseInt(isDate.getMonth()) + 1));
    }, [mode]);

    const loadHandler = useCallback((isDate) => {
        dispatch(calendarActions.setActiveDate(isDate));
    }, [dispatch, isDate]);

    const onSwipeUp = () => {
        isDate.setMonth(isDate.getMonth()+1);
        loadHandler(new Date(+isDate));
    };

    const onSwipeDown = () => {
        isDate.setMonth(isDate.getMonth()-1);
        loadHandler(new Date(+isDate));
    };

    useCode(
        () => [
            cond(eq(state, State.ACTIVE), [
                set(translateY, add(offsetY, translation.y))
            ]),
            cond(eq(state, State.END), [
                cond(not(clockRunning(clock2)), [
                    set(translateY, timing({ clock: clock, from: translateY, to: to })),
                    set(offsetY, translateY),
                ]),
                cond(not(clockRunning(clock)), [
                    cond(eq(offsetY, swipeUpY), [
                        cond(renderCalendarCallFg, [
                            call([], onSwipeUp),
                            set(renderCalendarCallFg, offFlag)
                        ]),
                        set(translateY, swipeDownY),
                        set(translateY, timing({ clock: clock2, duration: 130, from: translateY, to: swipeNoneY, easing: Easing.linear })),
                        cond(not(clockRunning(clock2)), [
                            set(offsetY, translateY),
                            set(renderCalendarCallFg, onFlag),
                        ])
                    ], [
                        cond(eq(offsetY, swipeDownY), [
                        cond(renderCalendarCallFg, [
                            call([], onSwipeDown),
                            set(renderCalendarCallFg, offFlag)
                        ]),
                        set(translateY, swipeUpY),
                        set(translateY, timing({ clock: clock2, duration: 130, from: translateY, to: swipeNoneY, easing: Easing.linear })),
                        cond(not(clockRunning(clock2)), [
                                set(offsetY, translateY),
                                set(renderCalendarCallFg, onFlag),
                            ])
                        ])
                    ]),
                ]),
            ]),
        ], [state]
    );

    const diaryHandler = (date, day, emotion) => {
        dispatch(diaryActions.loadDiary(
            isDate.getFullYear(),
            isDate.getMonth() + 1,
            date,
            day
        ));
        if (emotion !== -1) {
            setIsDiaryDetailOpened(true);
        } else {
            props.navigation.navigate("DiaryIntro");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Background style={{ ...styles.container, opacity: isDiaryDetailOpened ? Diary.opacity : 1 }}>
                <SafeAreaView style={ styles.container }>
                    <PanGestureHandler { ...gestureHandler }>
                        <Animated.View style={[ styles.animationContainer, { transform: [{ translateY }] } ]}>
                            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={ true }/>
                            <Header getDate={ isDate } parentProps={ props } saying={ saying } mode={ mode }/>
                            <Calendar getDate={ isDate } diaryHandler={ diaryHandler } parent={ this }/>
                        </Animated.View>
                    </PanGestureHandler>
                    <Footer parentProps={ props } emotions={ emotions }/>
                </SafeAreaView>
            </Background>
            {
                (isDiaryDetailOpened && diary.emotion !== '') ?
                    <RectangleBox style={ styles.diaryDetailContainer }>
                        <View style={ styles.contentContainer }>
                            <View style={ styles.imageContainer }>
                                <Image
                                    style={ styles.image }
                                    source={ Diary.emotionBears[diary.emotion].imgPath }
                                />
                            </View>
                            <Text style={ styles.dateTextStyle }>
                                { dateString }
                            </Text>
                            <ScrollView bounces={ false }>
                                <View style={ styles.description }>
                                        <Text>
                                            { diary.content }
                                        </Text>
                                </View>
                            </ScrollView>
                        </View>
                    </RectangleBox>
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
    contentContainer: {
        flex: 1,
    },
    diaryDetailContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '20%',
        width: 335,
        height: 400
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animationContainer: {
        flex: 3
    }
});

export default CalendarView;