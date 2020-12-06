// Standard
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

// Custom
import Colors from '../../constants/Colors';

const Header = props => {
    const [getYear, setYear] = useState(0);
    const [getMonth, setMonth] = useState(0);
    useEffect(() => {
        let date = new Date();
        setYear(date.getFullYear());
        setMonth(date.getMonth());
    }, []);
    return (
        <View style={ styles.container }>
            <Text style={ styles.year }>
                { getYear }
            </Text>
            <Text style={ styles.month }>
                { getMonth }
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    year: {
        textAlign: 'center',
        top: '15%',
        fontFamily: 'SFProText-Regular',
        fontStyle: 'normal',
        fontWeight: "900",
        fontSize: 20,
        color: Colors.HeaderTitle_gray
    },
    month: {
        textAlign: 'center',
        top: '16%',
        fontFamily: 'SFProText-Bold',
        fontWeight: '800',
        fontSize: 50,
        color: Colors.HeaderTitle_gray
    }
});

export default Header;