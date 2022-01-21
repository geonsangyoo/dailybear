/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
// Standard
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

// Custom
import Background from '../../components/layout/Background';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import * as calendarActions from '../../store/actions/Calendar';
import * as diaryActions from '../../store/actions/Diary';
import * as sayingActions from '../../store/actions/Saying';
import * as funcs from '../../helpers/funcs';
import * as calendarConsts from '../../constants/Calendar';
import SettingConstants from '../../constants/Setting';
import sayingConsts from '../../constants/Saying';
import Diary from '../../constants/Diary';
import Statistics from '../../constants/Statistics';
import Colors from '../../constants/Colors';

const marginFromTopVerticalRatio = calendarConsts.marginFromTopVerticalRatio;

const StatisticsView = (props) => {
  // Statistic View Rendering
  const isDate = useSelector((state) => state.calendar.activeDate);
  const saying = useSelector((state) => state.saying.saying);
  const mode = useSelector((state) => state.saying.mode);
  const emotions = useSelector((state) => state.calendar.emotions);
  const fontNameSetting = useSelector((state) => state.settings.fontName);
  const maxDays = funcs.getMaxDays(isDate.getFullYear(), isDate.getMonth());
  const [numberOfEmotions, setNumberOfEmotions] = useState([]);
  const [numberOfEmotionsSorted, setNumberOfEmotionsSorted] = useState([]);
  const [emotionLocation, setEmotionLocation] = useState([]);
  const [emotionDisplayed, setEmotionDisplayed] = useState(false);
  const dispatch = useDispatch();

  // Animation
  const animationDelay = 80;
  const animationThreshold =
    Dimensions.get('screen').height / calendarConsts.animationThresholdRatio;
  const scrollY = useRef(new Animated.Value(0)).current;
  const yPositionMin = Dimensions.get('screen').height * -1;
  const yPositionMax = Dimensions.get('screen').height;
  const yPositionInit = new Animated.Value(0);

  useEffect(() => {
    let locRandom = [
      Diary.emotionTitle.ANGRY,
      Diary.emotionTitle.CALM,
      Diary.emotionTitle.LOVELY,
      Diary.emotionTitle.GLOOMY,
      Diary.emotionTitle.SAD,
      Diary.emotionTitle.MELANCHOLY,
    ];
    let res = [];
    if (numberOfEmotionsSorted.length > 0 && !emotionDisplayed) {
      locRandom.sort((x) => Math.random() - 0.5);
      for (let val in Diary.emotionTitle) {
        if (val === 'NONE') {
          continue;
        }
        let number = numberOfEmotions[Diary.emotionTitle[val]];
        let top, left, width, height;

        // Decide where emotion figure is located
        top = Math.floor(
          locRandom.indexOf(Diary.emotionTitle[val]) *
            Statistics.emotionHeightRange,
        );
        left = Math.floor(Math.random() * Statistics.emotionWidthRange);

        // Decide how big the scale of emotion figure is
        if (
          Statistics.emotionSize.size1_min_number <= number &&
          number <= Statistics.emotionSize.size1_max_number
        ) {
          width = Statistics.emotionSize.size1_width;
          height = Statistics.emotionSize.size1_height;
        } else if (
          Statistics.emotionSize.size2_min_number <= number &&
          number <= Statistics.emotionSize.size2_max_number
        ) {
          width = Statistics.emotionSize.size2_width;
          height = Statistics.emotionSize.size2_height;
        } else if (
          Statistics.emotionSize.size3_min_number <= number &&
          number <= Statistics.emotionSize.size3_max_number
        ) {
          width = Statistics.emotionSize.size3_width;
          height = Statistics.emotionSize.size3_height;
        } else if (
          Statistics.emotionSize.size4_min_number <= number &&
          number <= maxDays
        ) {
          width = Statistics.emotionSize.size4_width;
          height = Statistics.emotionSize.size4_height;
        } else {
          // No day is assigned
          width = 0;
          height = 0;
        }
        res.push({
          top: top,
          left: left,
          width: width,
          height: height,
        });
      }
      setEmotionLocation(res);
      setEmotionDisplayed(true);
    }
  }, [
    emotionDisplayed,
    maxDays,
    numberOfEmotions,
    numberOfEmotionsSorted.length,
  ]);

  useEffect(() => {
    // Set number of emotions
    let angry = 0;
    let calm = 0;
    let lovely = 0;
    let gloomy = 0;
    let sad = 0;
    let melancholy = 0;
    let result;
    let resultArr;
    for (let i = 0; i < emotions.length; i++) {
      switch (emotions[i].emotion) {
        case Diary.emotionTitle.ANGRY:
          angry++;
          break;
        case Diary.emotionTitle.CALM:
          calm++;
          break;
        case Diary.emotionTitle.LOVELY:
          lovely++;
          break;
        case Diary.emotionTitle.GLOOMY:
          gloomy++;
          break;
        case Diary.emotionTitle.SAD:
          sad++;
          break;
        case Diary.emotionTitle.MELANCHOLY:
          melancholy++;
          break;
        default:
          break;
      }
    }
    result = [
      {
        name: 'angry',
        number: angry,
        rank: -1,
      },
      {
        name: 'calm',
        number: calm,
        rank: -1,
      },
      {
        name: 'lovely',
        number: lovely,
        rank: -1,
      },
      {
        name: 'gloomy',
        number: gloomy,
        rank: -1,
      },
      {
        name: 'sad',
        number: sad,
        rank: -1,
      },
      {
        name: 'melancholy',
        number: melancholy,
        rank: -1,
      },
    ];
    resultArr = JSON.parse(JSON.stringify(result));
    resultArr.sort((obj1, obj2) => {
      return obj1.number - obj2.number;
    });
    for (let i = resultArr.length - 1; i >= 0; i--) {
      if (i === resultArr.length - 1) {
        resultArr[i].rank = 1;
      }
      if (i < resultArr.length - 1) {
        if (resultArr[i].number === resultArr[i + 1].number) {
          resultArr[i].rank = resultArr[i + 1].rank;
        } else {
          resultArr[i].rank = resultArr[i + 1].rank + 1;
        }
      }
    }
    setNumberOfEmotionsSorted(resultArr);
    setNumberOfEmotions(result.map((obj) => obj.number));
  }, [emotions]);

  useEffect(() => {
    mode === sayingConsts.randomMode && saying === ''
      ? dispatch(
          sayingActions.loadSayingFromOuter(
            isDate.getFullYear(),
            parseInt(isDate.getMonth()) + 1,
          ),
        )
      : dispatch(
          sayingActions.loadSaying(
            isDate.getFullYear(),
            parseInt(isDate.getMonth()) + 1,
          ),
        );
  }, [dispatch, isDate, mode, saying]);

  const diaryHandler = (year, month, date, day, emotion) => {
    dispatch(diaryActions.loadDiary(year, month, date, day));
    if (emotion !== -1) {
      dispatch(calendarActions.setIsDiaryDetailed(true));
      props.navigation.navigate('CalendarView');
    } else {
      props.navigation.navigate('DiaryIntro');
    }
  };

  //   const getEmotionRank = (emotionTitle) => {
  //     let rank;
  //     if (numberOfEmotionsSorted.length > 0) {
  //       numberOfEmotionsSorted.forEach((val) => {
  //         if (val.name === emotionTitle) {
  //           rank = val.rank;
  //         }
  //       });
  //     } else {
  //       rank = 1;
  //     }
  //     return rank;
  //   };

  const loadHandler = useCallback(
    (isDate) => {
      dispatch(calendarActions.setActiveDate(isDate));
    },
    [dispatch],
  );

  const swipeUpAnimationAfter = () => {
    isDate.setMonth(isDate.getMonth() + 1);
    loadHandler(new Date(+isDate));
    setEmotionDisplayed(false);
    scrollY.setValue(yPositionMax);
    Animated.spring(scrollY, {
      toValue: yPositionInit,
      speed: 20,
      bounciness: 2,
      useNativeDriver: true,
    }).start();
  };

  const swipeDownAnimationAfter = () => {
    isDate.setMonth(isDate.getMonth() - 1);
    loadHandler(new Date(+isDate));
    setEmotionDisplayed(false);
    scrollY.setValue(yPositionMin);
    Animated.spring(scrollY, {
      toValue: yPositionInit,
      speed: 20,
      bounciness: 2,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      <Background style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContentContainer}>
            <Animated.ScrollView
              style={{transform: [{translateY: scrollY}]}}
              onScrollEndDrag={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {
                  listener: (event) => {
                    if (
                      event.nativeEvent.contentOffset.y > animationThreshold
                    ) {
                      scrollY.setValue(-1 * event.nativeEvent.contentOffset.y);
                      Animated.spring(scrollY, {
                        toValue: yPositionMin,
                        speed: 20,
                        bounciness: 2,
                        useNativeDriver: true,
                      }).start();
                      setTimeout(() => {
                        scrollY.stopAnimation(swipeUpAnimationAfter);
                      }, animationDelay);
                    } else if (
                      event.nativeEvent.contentOffset.y <
                      -1 * animationThreshold
                    ) {
                      scrollY.setValue(-1 * event.nativeEvent.contentOffset.y);
                      Animated.spring(scrollY, {
                        toValue: yPositionMax,
                        speed: 20,
                        bounciness: 2,
                        useNativeDriver: true,
                      }).start();
                      setTimeout(() => {
                        scrollY.stopAnimation(swipeDownAnimationAfter);
                      }, animationDelay);
                    } else {
                      // Back to the starting coord.
                      scrollY.setValue(0);
                    }
                  },
                  useNativeDriver: true,
                },
              )}
              scrollEventThrottle={1}>
              <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
              />
              <Header
                getDate={isDate}
                parentProps={props}
                saying={saying}
                mode={mode}
              />
              <View style={styles.emotionNumberContainer}>
                <View style={styles.emotionNumberItem}>
                  <View
                    style={{
                      ...styles.emotionOvalShape,
                      backgroundColor: Colors.EmotionOvalShape_angry,
                    }}
                  />
                  <Text
                    style={{
                      ...styles.emotionNumberText,
                      fontFamily: fontNameSetting
                        ? fontNameSetting
                        : SettingConstants.defaultFont,
                    }}>
                    {numberOfEmotions[Diary.emotionTitle.ANGRY]}
                  </Text>
                </View>
                <View style={styles.emotionNumberItem}>
                  <View
                    style={{
                      ...styles.emotionOvalShape,
                      backgroundColor: Colors.EmotionOvalShape_calm,
                    }}
                  />
                  <Text
                    style={{
                      ...styles.emotionNumberText,
                      fontFamily: fontNameSetting
                        ? fontNameSetting
                        : SettingConstants.defaultFont,
                    }}>
                    {numberOfEmotions[Diary.emotionTitle.CALM]}
                  </Text>
                </View>
                <View style={styles.emotionNumberItem}>
                  <View
                    style={{
                      ...styles.emotionOvalShape,
                      backgroundColor: Colors.EmotionOvalShape_lovely,
                    }}
                  />
                  <Text
                    style={{
                      ...styles.emotionNumberText,
                      fontFamily: fontNameSetting
                        ? fontNameSetting
                        : SettingConstants.defaultFont,
                    }}>
                    {numberOfEmotions[Diary.emotionTitle.LOVELY]}
                  </Text>
                </View>
                <View style={styles.emotionNumberItem}>
                  <View
                    style={{
                      ...styles.emotionOvalShape,
                      backgroundColor: Colors.EmotionOvalShape_gloomy,
                    }}
                  />
                  <Text
                    style={{
                      ...styles.emotionNumberText,
                      fontFamily: fontNameSetting
                        ? fontNameSetting
                        : SettingConstants.defaultFont,
                    }}>
                    {numberOfEmotions[Diary.emotionTitle.GLOOMY]}
                  </Text>
                </View>
                <View style={styles.emotionNumberItem}>
                  <View
                    style={{
                      ...styles.emotionOvalShape,
                      backgroundColor: Colors.EmotionOvalShape_sad,
                    }}
                  />
                  <Text
                    style={{
                      ...styles.emotionNumberText,
                      fontFamily: fontNameSetting
                        ? fontNameSetting
                        : SettingConstants.defaultFont,
                    }}>
                    {numberOfEmotions[Diary.emotionTitle.SAD]}
                  </Text>
                </View>
                <View style={styles.emotionNumberItem}>
                  <View
                    style={{
                      ...styles.emotionOvalShape,
                      backgroundColor: Colors.EmotionOvalShape_melancholy,
                    }}
                  />
                  <Text
                    style={{
                      ...styles.emotionNumberText,
                      fontFamily: fontNameSetting
                        ? fontNameSetting
                        : SettingConstants.defaultFont,
                    }}>
                    {numberOfEmotions[Diary.emotionTitle.MELANCHOLY]}
                  </Text>
                </View>
              </View>
              {emotionLocation.length > 0 ? (
                <View style={styles.imageContainer}>
                  {numberOfEmotions[Diary.emotionTitle.ANGRY] > 0 ? (
                    <Image
                      style={{
                        ...styles.image,
                        top: emotionLocation[Diary.emotionTitle.ANGRY].top,
                        left: emotionLocation[Diary.emotionTitle.ANGRY].left,
                        width: emotionLocation[Diary.emotionTitle.ANGRY].width,
                        height:
                          emotionLocation[Diary.emotionTitle.ANGRY].height,
                      }}
                      source={
                        Diary.emotionBears[Diary.emotionTitle.ANGRY].imgPath
                      }
                    />
                  ) : null}
                  {numberOfEmotions[Diary.emotionTitle.CALM] > 0 ? (
                    <Image
                      style={{
                        ...styles.image,
                        top: emotionLocation[Diary.emotionTitle.CALM].top,
                        left: emotionLocation[Diary.emotionTitle.CALM].left,
                        width: emotionLocation[Diary.emotionTitle.CALM].width,
                        height: emotionLocation[Diary.emotionTitle.CALM].height,
                      }}
                      source={
                        Diary.emotionBears[Diary.emotionTitle.CALM].imgPath
                      }
                    />
                  ) : null}
                  {numberOfEmotions[Diary.emotionTitle.LOVELY] > 0 ? (
                    <Image
                      style={{
                        ...styles.image,
                        top: emotionLocation[Diary.emotionTitle.LOVELY].top,
                        left: emotionLocation[Diary.emotionTitle.LOVELY].left,
                        width: emotionLocation[Diary.emotionTitle.LOVELY].width,
                        height:
                          emotionLocation[Diary.emotionTitle.LOVELY].height,
                      }}
                      source={
                        Diary.emotionBears[Diary.emotionTitle.LOVELY].imgPath
                      }
                    />
                  ) : null}
                  {numberOfEmotions[Diary.emotionTitle.GLOOMY] > 0 ? (
                    <Image
                      style={{
                        ...styles.image,
                        top: emotionLocation[Diary.emotionTitle.GLOOMY].top,
                        left: emotionLocation[Diary.emotionTitle.GLOOMY].left,
                        width: emotionLocation[Diary.emotionTitle.GLOOMY].width,
                        height:
                          emotionLocation[Diary.emotionTitle.GLOOMY].height,
                      }}
                      source={
                        Diary.emotionBears[Diary.emotionTitle.GLOOMY].imgPath
                      }
                    />
                  ) : null}
                  {numberOfEmotions[Diary.emotionTitle.SAD] > 0 ? (
                    <Image
                      style={{
                        ...styles.image,
                        top: emotionLocation[Diary.emotionTitle.SAD].top,
                        left: emotionLocation[Diary.emotionTitle.SAD].left,
                        width: emotionLocation[Diary.emotionTitle.SAD].width,
                        height: emotionLocation[Diary.emotionTitle.SAD].height,
                      }}
                      source={
                        Diary.emotionBears[Diary.emotionTitle.SAD].imgPath
                      }
                    />
                  ) : null}
                  {numberOfEmotions[Diary.emotionTitle.MELANCHOLY] > 0 ? (
                    <Image
                      style={{
                        ...styles.image,
                        top: emotionLocation[Diary.emotionTitle.MELANCHOLY].top,
                        left: emotionLocation[Diary.emotionTitle.MELANCHOLY]
                          .left,
                        width:
                          emotionLocation[Diary.emotionTitle.MELANCHOLY].width,
                        height:
                          emotionLocation[Diary.emotionTitle.MELANCHOLY].height,
                      }}
                      source={
                        Diary.emotionBears[Diary.emotionTitle.MELANCHOLY]
                          .imgPath
                      }
                    />
                  ) : null}
                </View>
              ) : null}
            </Animated.ScrollView>
          </View>
          <Footer
            parentProps={props}
            parent={this}
            diaryHandler={diaryHandler}
          />
        </SafeAreaView>
      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  mainContentContainer: {
    top: Dimensions.get('window').height / marginFromTopVerticalRatio,
    height: '80%',
  },
  emotionNumberContainer: {
    flexDirection: 'column',
    marginLeft: '8%',
    marginTop: '20%',
  },
  emotionNumberItem: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  emotionOvalShape: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: 1,
  },
  emotionNumberText: {
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 8,
    fontSize: 15,
    color: Colors.HeaderTitle_gray,
  },
  imageContainer: {
    position: 'absolute',
    top: '50%',
    left: '30%',
  },
  image: {
    position: 'absolute',
    width: 66,
    height: 60,
    margin: 20,
  },
});

export default StatisticsView;
