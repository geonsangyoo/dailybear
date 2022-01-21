// Standard
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

const Background = (props) => {
  return (
    <View style={{...props.style, ...styles.container}}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.image}>
        {props.children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Background;
