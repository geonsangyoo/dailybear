/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
// Standard
import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar, Dimensions, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

// Custom
import Background from '../../components/layout/Background';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import List from '../../components/main/List';
import * as calendarConsts from '../../constants/Calendar';
import * as calendarActions from '../../store/actions/Calendar';
import * as diaryActions from '../../store/actions/Diary';
import * as sayingActions from '../../store/actions/Saying';
import * as funcs from '../../helpers/funcs';
import sayingConsts from '../../constants/Saying';

const marginFromTopVerticalRatio = calendarConsts.marginFromTopVerticalRatio;

const ListView = (props) => {
  // List View Rendering
  const isDate = useSelector((state) => state.calendar.activeDate);
  const saying = useSelector((state) => state.saying.saying);
  const mode = useSelector((state) => state.saying.mode);
  const emotions = useSelector((state) => state.calendar.emotions);
  const contents = useSelector((state) => state.calendar.contents);
  const maxDays = funcs.getMaxDays(isDate.getFullYear(), isDate.getMonth());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      calendarActions.loadContents(
        isDate.getFullYear(),
        isDate.getMonth() + 1,
        maxDays,
      ),
    );
  }, [dispatch, isDate, maxDays]);

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

  return (
    <View style={{flex: 1}}>
      <Background style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContentContainer}>
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
            {contents.length > 0 ? (
              <View style={styles.listContainer}>
                <FlatList
                  data={emotions}
                  keyExtractor={(item) => String(item.date)}
                  renderItem={(itemData) => (
                    <List
                      date={itemData.item.date}
                      emotionTitle={itemData.item.emotion}
                      content={contents[itemData.index].content}
                    />
                  )}
                />
              </View>
            ) : null}
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
  },
  mainContentContainer: {
    top: Dimensions.get('window').height / marginFromTopVerticalRatio,
    height: '80%',
  },
  listContainer: {
    marginTop: '10%',
    height: '60%',
  },
});

export default ListView;
