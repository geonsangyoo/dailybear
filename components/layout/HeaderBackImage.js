// Standard
import React from 'react';
import { StyleSheet, Image } from 'react-native';

const HeaderBackImage = props => {
    return (
        <Image 
            source={
                require('../../assets/icons/back.png')
            }
            style={ styles.HeaderImage }
        />
    )
};

const styles = StyleSheet.create({
    HeaderImage: {
        width: 24,
        height: 24,
        marginLeft: 14.25,
        resizeMode: 'contain'
    }
});

export default HeaderBackImage;