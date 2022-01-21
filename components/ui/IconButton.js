// Standard
import React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import {useSelector} from 'react-redux';

// Custom
import SettingConstants from '../../constants/Setting';
import Colors from '../../constants/Colors';

const IconButton = (props) => {
  const fontNameSetting = useSelector((state) => state.settings.fontName);

  const {setting} = props;
  const {name} = props;
  const imgPath =
    setting === name
      ? require('../../assets/icons/check_on.png')
      : require('../../assets/icons/check_off.png');

  return (
    <View>
      <Pressable
        onPress={() => {
          props.clickHandler(name);
        }}
        style={styles.settingButton}>
        <Image style={styles.icon} source={imgPath} />
        <Text
          style={{
            ...styles.text,
            fontFamily: fontNameSetting
              ? fontNameSetting
              : SettingConstants.defaultFont,
          }}>
          {name}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  settingButton: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    top: 2,
    marginLeft: 10,
    fontSize: 14,
    color: Colors.HeaderTitle_gray,
  },
});

export default IconButton;
