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
        setMonth(date.getMonth() + 1);
    }, []);
    return (
        <View style={ styles.container }>
            <Text style={ styles.year }>
                { getYear }
            </Text>
            <Text style={ styles.month }>
                { getMonth }
            </Text>
            <Text style={ styles.saying }>
                { `Do not be afraid to give up \n the good to go for the great` }
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    year: {
        textAlign: 'center',
        top: '35%',
        fontFamily: 'SFProText-Regular',
        fontStyle: 'normal',
        fontWeight: '900',
        fontSize: 20,
        color: Colors.HeaderTitle_gray
    },
    month: {
        textAlign: 'center',
        top: '35%',
        fontFamily: 'SFProText-Bold',
        fontWeight: '900',
        fontSize: 45,
        color: Colors.HeaderTitle_gray
    },
    saying: {
        textAlign: 'center',
        top: '40%',
        fontFamily: 'SFProText-Regular',
        fontSize: 15,
        color: Colors.HeaderTitle_gray
    }
});

export default Header;