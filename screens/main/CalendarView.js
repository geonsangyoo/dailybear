// Standard
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Custom
import Background from '../../components/layout/Background';
import Header from '../../components/layout/Header';
import Calendar from '../../components/main/Calendar';
import Footer from '../../components/layout/Footer';

const CalendarView = props => {
    
    return (
        <Background>
            <Header />
            <Calendar />
            <Footer />
        </Background>
    );
}

export default CalendarView;