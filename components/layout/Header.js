// Standard
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// Custom
import Colors from '../../constants/Colors';

const Header = props => {
    return (
        <View style={ styles.container }>
            <Text style={ styles.year }>
                { props.getDate.getFullYear() }
            </Text>
            <Text style={ styles.month }>
                { props.getDate.getMonth() + 1 }
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
        top: '15%',
        fontFamily: 'SFProText-Regular',
        fontStyle: 'normal',
        fontWeight: '900',
        fontSize: 20,
        color: Colors.HeaderTitle_gray
    },
    month: {
        textAlign: 'center',
        top: '15%',
        fontFamily: 'SFProText-Bold',
        fontWeight: '900',
        fontSize: 45,
        color: Colors.HeaderTitle_gray
    },
    saying: {
        textAlign: 'center',
        top: '25%',
        fontFamily: 'SFProText-Regular',
        fontSize: 15,
        color: Colors.HeaderTitle_gray
    }
});

export default Header;