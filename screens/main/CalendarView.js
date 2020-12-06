// Standard
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Custom
import Background from '../../components/layout/Background';
import Header from '../../components/layout/Header';

const CalendarView = props => {
    return (
        <Background>
            <Header />
        </Background>
    );
}

export default CalendarView;