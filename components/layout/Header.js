// Standard
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

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
            <TouchableOpacity 
                style={ styles.sayingContainer } 
                onPress={ () => { props.parentProps.navigation.navigate("SayingDetail") } }
            >
                <Text style={ styles.saying }>
                    { `Do not be afraid to give up \n the good to go for the great` }
                </Text>
            </TouchableOpacity>
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
    sayingContainer: {
        flex: 1,
        marginTop: '5%'
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