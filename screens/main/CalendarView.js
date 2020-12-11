// Standard
import React, { useCallback } from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import GestureRecognizer from 'react-native-swipe-gestures';

// Custom
import Background from '../../components/layout/Background';
import Header from '../../components/layout/Header';
import Calendar from '../../components/main/Calendar';
import Footer from '../../components/layout/Footer';
import * as calendarAction from '../../store/actions/Calendar';

const CalendarView = props => {
    const isDate = useSelector(state => state.calendar.activeDate);
    const dispatch = useDispatch();

    const loadHandler = useCallback((activeDate) => {
        dispatch(calendarAction.setActiveDate(activeDate));
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
                    <Header getDate={ isDate }/>
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