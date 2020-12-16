// Standard
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Custom
import Colors from '../../constants/Colors';

const IconButton = props => {
    
    const { setting } = props;
    const { name } = props;
    const imgPath =
         ( setting === name) ?
         require('../../assets/icons/check_on.png') :
         require('../../assets/icons/check_off.png');

    return (
        <View>
            <TouchableOpacity onPress={ () => { props.clickHandler(name) }} style={ styles.settingButton }>
                <Image 
                    style={ styles.icon }
                    source={ imgPath }
                />
                <Text style={ styles.text }>{ name }</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    settingButton: {
        flexDirection: 'row',
        marginHorizontal: 15
    },
    icon: {
        width: 20,
        height: 20
    },
    text: {
        top: 2,
        marginLeft: 6,
        fontSize: 14,
        fontFamily: 'SFProText-Regular',
        color: Colors.HeaderTitle_gray
    }
});

export default IconButton;