// Standard
import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// Custom
import Diary from '../../constants/Diary';
import * as diaryActions from '../../store/actions/Diary';
import SettingConstants from '../../constants/Setting';
import Background from '../../components/layout/Background';
import HeaderBackImage from '../../components/layout/HeaderBackImage';
import RectangleBox from '../../components/ui/RectangleBox';
import Colors from '../../constants/Colors';

const DiaryIntroBackImage = require('../../assets/icons/close.png');

const DiaryIntro = (props) => {
  const isDiaryDetailed = useSelector(
    (state) => state.calendar.isDiaryDetailed,
  );
  const date = useSelector((status) => status.diary.date);
  const fontNameSetting = useSelector((state) => state.settings.fontName);
  const dispatch = useDispatch();
  const dateString =
    Object.keys(date).length > 0
      ? Diary.convertDate(date.year, date.month, date.date, date.day)
      : '';

  const navigateDetail = (emotion) => {
    props.navigation.navigate('DiaryDetail', {
      dateString: dateString,
      emotion: emotion,
    });
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => {
            if (!isDiaryDetailed) {
              dispatch(diaryActions.initDiary());
            }
            props.navigation.goBack();
          }}>
          <HeaderBackImage imagePath={DiaryIntroBackImage} />
        </Pressable>
      ),
    });
  });

  return (
    <Background style={styles.container}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.dateTextStyle,
              fontFamily: fontNameSetting
                ? fontNameSetting
                : SettingConstants.defaultFont,
            }}>
            {dateString}
          </Text>
          <Text
            style={{
              ...styles.diaryIntroTextStyle,
              fontFamily: fontNameSetting
                ? fontNameSetting
                : SettingConstants.defaultFont,
            }}>
            {Diary.diaryIntro}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <RectangleBox style={styles.rectangleBoxContainer}>
            <View style={styles.emotionBearContainer}>
              <View style={styles.emotionBearRow}>
                <Pressable
                  onPress={navigateDetail.bind(this, Diary.emotionTitle.ANGRY)}>
                  <Image
                    style={styles.image}
                    source={
                      Diary.emotionBears[Diary.emotionTitle.ANGRY].imgPath
                    }
                  />
                </Pressable>
                <Pressable
                  onPress={navigateDetail.bind(this, Diary.emotionTitle.CALM)}>
                  <Image
                    style={styles.image}
                    source={Diary.emotionBears[Diary.emotionTitle.CALM].imgPath}
                  />
                </Pressable>
                <Pressable
                  onPress={navigateDetail.bind(
                    this,
                    Diary.emotionTitle.LOVELY,
                  )}>
                  <Image
                    style={styles.image}
                    source={
                      Diary.emotionBears[Diary.emotionTitle.LOVELY].imgPath
                    }
                  />
                </Pressable>
              </View>
              <View style={styles.emotionBearRow}>
                <Pressable
                  onPress={navigateDetail.bind(
                    this,
                    Diary.emotionTitle.GLOOMY,
                  )}>
                  <Image
                    style={styles.image}
                    source={
                      Diary.emotionBears[Diary.emotionTitle.GLOOMY].imgPath
                    }
                  />
                </Pressable>
                <Pressable
                  onPress={navigateDetail.bind(this, Diary.emotionTitle.SAD)}>
                  <Image
                    style={styles.image}
                    source={Diary.emotionBears[Diary.emotionTitle.SAD].imgPath}
                  />
                </Pressable>
                <Pressable
                  onPress={navigateDetail.bind(
                    this,
                    Diary.emotionTitle.MELANCHOLY,
                  )}>
                  <Image
                    style={styles.image}
                    source={
                      Diary.emotionBears[Diary.emotionTitle.MELANCHOLY].imgPath
                    }
                  />
                </Pressable>
              </View>
            </View>
          </RectangleBox>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    top: '12%',
  },
  image: {
    width: 76,
    height: 70,
    marginHorizontal: 18,
  },
  dateTextStyle: {
    color: Colors.HeaderTitle_gray,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '900',
    textAlign: 'center',
  },
  diaryIntroTextStyle: {
    marginTop: 8,
    color: Colors.HeaderTitle_gray,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 4,
  },
  rectangleBoxContainer: {
    alignSelf: 'center',
    marginTop: 15,
  },
  emotionBearContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  emotionBearRow: {
    flexDirection: 'row',
    alignContent: 'center',
    marginVertical: 20,
  },
});

export default DiaryIntro;
