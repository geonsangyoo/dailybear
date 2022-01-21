/* eslint-disable react-native/no-inline-styles */
// Standard
import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-elements';

// Custom
import * as settingsAction from '../../store/actions/Settings';
import SettingConstants from '../../constants/Setting';
import Setting from '../../constants/Setting';
import Diary from '../../constants/Diary';
import Background from '../../components/layout/Background';
import RectangleBox from '../../components/ui/RectangleBox';
import Colors from '../../constants/Colors';

const FontSetting = (props) => {
  const fontNameSetting = useSelector((state) => state.settings.fontName);
  const [fontNameState, setFontNameState] = useState('');
  const dispatch = useDispatch();

  const changeFontName = useCallback(() => {
    dispatch(settingsAction.saveSetting('font', 'name', fontNameState)).then(
      (res) => {
        Alert.alert(
          'Font Setting',
          'Font is successfully set',
          [
            {
              text: 'OK',
              style: 'default',
            },
          ],
          {
            cancelable: false,
          },
        );
      },
      (err) => {
        Alert.alert(
          'Font Setting',
          String(err),
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          {
            cancelable: false,
          },
        );
      },
    );
  }, [dispatch, fontNameState]);

  useEffect(() => {
    // Load Setting
    dispatch(settingsAction.loadSetting());
  }, [dispatch]);

  useEffect(() => {
    setFontNameState(fontNameSetting);
  }, [fontNameSetting]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          type="clear"
          onPress={changeFontName}
          titleStyle={{
            ...styles.headerRightText,
            fontFamily: fontNameSetting
              ? fontNameSetting
              : SettingConstants.defaultFont,
          }}
        />
      ),
      headerRightContainerStyle: styles.headerRightContainer,
    });
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Background style={styles.container}>
        <View style={styles.rectangleBoxContainer}>
          <RectangleBox style={styles.rectangleBox}>
            <View style={styles.container}>
              <Image
                style={styles.image}
                source={Diary.emotionBears[Diary.emotionTitle.CALM].imgPath}
              />
              <Text
                style={{...styles.previewTextStyle, fontFamily: fontNameState}}>
                {Setting.fontPreviewText}
              </Text>
            </View>
          </RectangleBox>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentRow}>
            <Text style={styles.contentText}>{Setting.defaultFontTitle}</Text>
            <Pressable
              style={styles.settingContainer}
              onPress={() => {
                setFontNameState(Setting.defaultFont);
              }}>
              <Image
                style={styles.checkIcon}
                source={
                  fontNameState === Setting.defaultFont
                    ? require('../../assets/icons/setting_check.png')
                    : null
                }
              />
              <Text
                style={{
                  ...styles.settingText,
                  fontFamily:
                    fontNameState === Setting.defaultFont
                      ? Setting.defaultBoldFont
                      : Setting.defaultFont,
                  fontWeight:
                    fontNameState === Setting.defaultFont ? '900' : '400',
                }}>
                {fontNameState === Setting.defaultFont
                  ? Setting.fontSelected
                  : Setting.fontSelect}
              </Text>
            </Pressable>
          </View>
          <View style={styles.contentRow}>
            <Text
              style={{
                ...styles.contentText,
                fontFamily: Setting.tmoneyRoundWindFont,
              }}>
              {Setting.tmoneyRoundWindFontTitle}
            </Text>
            <Pressable
              style={styles.settingContainer}
              onPress={() => {
                setFontNameState(Setting.tmoneyRoundWindFont);
              }}>
              <Image
                style={styles.checkIcon}
                source={
                  fontNameState === Setting.tmoneyRoundWindFont
                    ? require('../../assets/icons/setting_check.png')
                    : null
                }
              />
              <Text
                style={{
                  ...styles.settingText,
                  fontFamily:
                    fontNameState === Setting.tmoneyRoundWindFont
                      ? Setting.defaultBoldFont
                      : Setting.defaultFont,
                  fontWeight:
                    fontNameState === Setting.tmoneyRoundWindFont
                      ? '900'
                      : '400',
                }}>
                {fontNameState === Setting.tmoneyRoundWindFont
                  ? Setting.fontSelected
                  : Setting.fontSelect}
              </Text>
            </Pressable>
          </View>
          <View style={styles.contentRow}>
            <Text
              style={{
                ...styles.contentText,
                fontFamily: Setting.mapoFlowerIslandFont,
              }}>
              {Setting.mapoFlowerIslandFontTitle}
            </Text>
            <Pressable
              style={styles.settingContainer}
              onPress={() => {
                setFontNameState(Setting.mapoFlowerIslandFont);
              }}>
              <Image
                style={styles.checkIcon}
                source={
                  fontNameState === Setting.mapoFlowerIslandFont
                    ? require('../../assets/icons/setting_check.png')
                    : null
                }
              />
              <Text
                style={{
                  ...styles.settingText,
                  fontFamily:
                    fontNameState === Setting.mapoFlowerIslandFont
                      ? Setting.defaultBoldFont
                      : Setting.defaultFont,
                  fontWeight:
                    fontNameState === Setting.mapoFlowerIslandFont
                      ? '900'
                      : '400',
                }}>
                {fontNameState === Setting.mapoFlowerIslandFont
                  ? Setting.fontSelected
                  : Setting.fontSelect}
              </Text>
            </Pressable>
          </View>
          <View style={styles.contentRow}>
            <Text
              style={{...styles.contentText, fontFamily: Setting.bazziFont}}>
              {Setting.bazziFontTitle}
            </Text>
            <Pressable
              style={styles.settingContainer}
              onPress={() => {
                setFontNameState(Setting.bazziFont);
              }}>
              <Image
                style={styles.checkIcon}
                source={
                  fontNameState === Setting.bazziFont
                    ? require('../../assets/icons/setting_check.png')
                    : null
                }
              />
              <Text
                style={{
                  ...styles.settingText,
                  fontFamily:
                    fontNameState === Setting.bazziFont
                      ? Setting.defaultBoldFont
                      : Setting.defaultFont,
                  fontWeight:
                    fontNameState === Setting.bazziFont ? '900' : '400',
                }}>
                {fontNameState === Setting.bazziFont
                  ? Setting.fontSelected
                  : Setting.fontSelect}
              </Text>
            </Pressable>
          </View>
          <View style={styles.contentRow}>
            <Text
              style={{
                ...styles.contentText,
                fontFamily: Setting.kyoboHandwriting2019Font,
              }}>
              {Setting.kyoboHandwriting2019FontTitle}
            </Text>
            <Pressable
              style={styles.settingContainer}
              onPress={() => {
                setFontNameState(Setting.kyoboHandwriting2019Font);
              }}>
              <Image
                style={styles.checkIcon}
                source={
                  fontNameState === Setting.kyoboHandwriting2019Font
                    ? require('../../assets/icons/setting_check.png')
                    : null
                }
              />
              <Text
                style={{
                  ...styles.settingText,
                  fontFamily:
                    fontNameState === Setting.kyoboHandwriting2019Font
                      ? Setting.defaultBoldFont
                      : Setting.defaultFont,
                  fontWeight:
                    fontNameState === Setting.kyoboHandwriting2019Font
                      ? '900'
                      : '400',
                }}>
                {fontNameState === Setting.kyoboHandwriting2019Font
                  ? Setting.fontSelected
                  : Setting.fontSelect}
              </Text>
            </Pressable>
          </View>
          <View style={styles.contentRow}>
            <Text
              style={{
                ...styles.contentText,
                fontFamily: Setting.mapoPeacefullFont,
              }}>
              {Setting.mapoPeacefullFontTitle}
            </Text>
            <Pressable
              style={styles.settingContainer}
              onPress={() => {
                setFontNameState(Setting.mapoPeacefullFont);
              }}>
              <Image
                style={styles.checkIcon}
                source={
                  fontNameState === Setting.mapoPeacefullFont
                    ? require('../../assets/icons/setting_check.png')
                    : null
                }
              />
              <Text
                style={{
                  ...styles.settingText,
                  fontFamily:
                    fontNameState === Setting.mapoPeacefullFont
                      ? Setting.defaultBoldFont
                      : Setting.defaultFont,
                  fontWeight:
                    fontNameState === Setting.mapoPeacefullFont ? '900' : '400',
                }}>
                {fontNameState === Setting.mapoPeacefullFont
                  ? Setting.fontSelected
                  : Setting.fontSelect}
              </Text>
            </Pressable>
          </View>
        </View>
      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRightContainer: {
    marginRight: 14,
  },
  headerRightText: {
    color: Colors.HeaderTitle_gray,
    fontSize: 17,
  },
  rectangleBoxContainer: {
    flex: 1,
    top: '13%',
    alignSelf: 'center',
  },
  rectangleBox: {
    width: 335,
    height: 214,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 2,
    left: '6%',
    marginHorizontal: 15,
    marginTop: 80,
  },
  contentRow: {
    flexDirection: 'row',
  },
  contentText: {
    marginVertical: 20,
    fontFamily: 'SFProText-Regular',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.HeaderTitle_gray,
  },
  settingContainer: {
    position: 'absolute',
    flexDirection: 'row',
    right: '13%',
    marginTop: 20,
  },
  settingText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 5,
    color: Colors.SettingTitle_brown,
  },
  checkIcon: {
    marginLeft: 3,
    width: 20,
    height: 20,
  },
  image: {
    width: 95,
    height: 87.5,
    alignSelf: 'center',
    marginTop: 35,
    marginBottom: 18,
    marginHorizontal: 18,
  },
  previewTextStyle: {
    color: Colors.HeaderTitle_gray,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default FontSetting;
