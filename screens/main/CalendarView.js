// Standard
import React, { useEffect, useCallback } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import GestureRecognizer from 'react-native-swipe-gestures';

// Custom
import Background from '../../components/layout/Background';
import Header from '../../components/layout/Header';
import Calendar from '../../components/main/Calendar';
import Footer from '../../components/layout/Footer';
import * as calendarAction from '../../store/actions/Calendar';
import * as sayingAction from '../../store/actions/Saying';

const CalendarView = props => {
    const isDate = useSelector(state => state.calendar.activeDate);
    const saying = useSelector(state => state.saying.saying);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sayingAction.loadSayingSetting());
        dispatch(sayingAction.loadSaying(isDate.getFullYear(), parseInt(isDate.getMonth()) + 1));
    }, [isDate]);

    const loadHandler = useCallback((isDate) => {
        dispatch(calendarAction.setActiveDate(isDate));
    }, [dispatch, isDate]);

    const onSwipeUp = state => {
        isDate.setMonth(isDate.getMonth()+1);
        loadHandler(new Date(+isDate));
    };

    const onSwipeDown = state => {
        isDate.setMonth(isDate.getMonth()-1);
        loadHandler(new Date(+isDate));
    };

    return (
        <GestureRecognizer style={ styles.gestureContainer }
            onSwipeUp={
                (state) => onSwipeUp(state)
            }
            onSwipeDown={
                (state) => onSwipeDown(state)
            }
        >
            <Background>
                <SafeAreaView style={ styles.container }>
                    <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={ true }/>
                    <Header getDate={ isDate } parentProps={ props } saying={ saying } />
                    <Calendar getDate={ isDate }/>
                    <Footer />
                </SafeAreaView>
            </Background>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    gestureContainer: {
        flex: 1
    },
    container: {
        flex: 1
    }
});

export default CalendarView;