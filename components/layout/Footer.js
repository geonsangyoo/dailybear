// Standard
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// Custom
import * as diaryActions from '../../store/actions/Diary';
import * as calendarConsts from '../../constants/Calendar';
import Colors from '../../constants/Colors';

const Footer = (props) => {
  const today = new Date();
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [viewMode, setViewMode] = useState(null);
  const [viewModeImgPath, setViewModeImgPath] = useState(null);
  const emotion = useSelector((state) => state.diary.emotion);
  const date = useSelector((state) => state.diary.date);

  useEffect(() => {
    switch (props.parentProps.route.name) {
      case 'CalendarView':
        setViewMode('StatisticsView');
        setViewModeImgPath(require('../../assets/icons/calender.png'));
        break;
      case 'StatisticsView':
        setViewMode('ListView');
        setViewModeImgPath(require('../../assets/icons/graph.png'));
        break;
      case 'ListView':
        setViewMode('CalendarView');
        setViewModeImgPath(require('../../assets/icons/list.png'));
        break;
      default:
        break;
    }
  }, [props.parentProps]);

  useEffect(() => {
    if (isClicked) {
      if (emotion !== '') {
        props.diaryHandler.call(
          props.parent,
          today.getFullYear(),
          today.getMonth() + 1,
          today.getDate(),
          calendarConsts.weekDaysLong[today.getDay()],
          emotion,
        );
      } else {
        props.parentProps.navigation.navigate('DiaryIntro');
      }
      setIsClicked(false);
    }
  }, [
    date,
    emotion,
    isClicked,
    props.diaryHandler,
    props.parent,
    props.parentProps.navigation,
    today,
  ]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          props.parentProps.navigation.navigate(viewMode);
        }}
        style={{...styles.viewMode_circle, ...styles.shadow}}>
        <Image source={viewModeImgPath} style={styles.icon} />
      </Pressable>
      <Pressable
        onPress={() => {
          props.parentProps.navigation.navigate('Setting');
        }}
        style={{...styles.setting_circle, ...styles.shadow}}>
        <Image
          source={require('../../assets/icons/setting.png')}
          style={styles.icon}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          dispatch(
            diaryActions.loadDiary(
              today.getFullYear(),
              today.getMonth() + 1,
              today.getDate(),
              calendarConsts.weekDaysLong[today.getDay()],
            ),
          );
          setIsClicked(true);
        }}
        style={{...styles.edit_circle, ...styles.shadow}}>
        <Image
          source={require('../../assets/icons/edit.png')}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    bottom: '13%',
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
  },
  viewMode_circle: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    left: '7%',
    backgroundColor: Colors.FooterIconBackground_white,
  },
  setting_circle: {
    position: 'absolute',
    width: 46,
    height: 46,
    left: '23%',
    borderRadius: 46 / 2,
    backgroundColor: Colors.FooterIconBackground_white,
  },
  edit_circle: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    right: '7%',
    backgroundColor: Colors.FooterIconBackground_brown,
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 11,
    marginLeft: 11,
  },
});

export default Footer;
