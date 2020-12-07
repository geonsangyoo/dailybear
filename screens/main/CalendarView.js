// Standard
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Custom
import Background from '../../components/layout/Background';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Colors from '../../constants/Colors';

const CalendarView = props => {
    return (
        <Background>
            <Header />
            <Footer />
        </Background>
    );
}

export default CalendarView;