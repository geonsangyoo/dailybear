// Standard
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

// Custom
import CalendarView from '../screens/main/CalendarView';
import ListView from '../screens/main/ListView';
import SayingDetail from '../screens/main/SayingDetail';
import StatisticsView from '../screens/main/StatisticsView';
import HeaderBackImage from '../components/layout/HeaderBackImage';
import DiaryIntro from '../screens/main/DiaryIntro';
import DiaryDetail from '../screens/main/DiaryDetail';
import Setting from '../screens/main/Setting';
import TermsAndCondition from '../screens/sub/TermsAndCondition';
import FontSetting from '../screens/sub/FontSetting';
import SettingConstants from '../constants/Setting';
import Colors from '../constants/Colors';

const MainNavigatorScreen = createStackNavigator();
const BackBackImage = require('../assets/icons/back.png');
const CloseBackImage = require('../assets/icons/close.png');

const MainContainer = () => {
  const fontNameSetting = useSelector((state) => state.settings.fontName);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainNavigatorScreen.Navigator
          mode="card"
          headerMode="float"
          initialRouteName="CalendarView">
          <MainNavigatorScreen.Screen
            name="CalendarView"
            component={CalendarView}
            options={{
              headerTitle: () => {},
              headerBackTitleVisible: false,
              headerTintColor: Colors.HeaderTitle_gray,
              headerTransparent: true,
            }}
          />
          <MainNavigatorScreen.Screen
            name="DiaryIntro"
            component={DiaryIntro}
            options={{
              headerTitle: () => {},
              headerBackTitleVisible: false,
              headerTintColor: Colors.HeaderTitle_gray,
              headerTransparent: true,
            }}
          />
          <MainNavigatorScreen.Screen
            name="DiaryDetail"
            component={DiaryDetail}
            options={{
              headerTitle: () => {},
              headerBackTitleVisible: false,
              headerTintColor: Colors.HeaderTitle_gray,
              headerTransparent: true,
              ...TransitionPresets.FadeFromBottomAndroid,
            }}
          />
          <MainNavigatorScreen.Screen
            name="StatisticsView"
            component={StatisticsView}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <MainNavigatorScreen.Screen
            name="ListView"
            component={ListView}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <MainNavigatorScreen.Screen
            name="SayingDetail"
            component={SayingDetail}
            options={{
              headerTitle: 'A word of this month',
              headerTitleStyle: {
                fontFamily: fontNameSetting
                  ? fontNameSetting
                  : SettingConstants.defaultFont,
              },
              headerBackImage: () => (
                <HeaderBackImage imagePath={BackBackImage} />
              ),
              headerBackTitleVisible: false,
              headerTintColor: Colors.HeaderTitle_gray,
              headerTransparent: true,
            }}
          />
          <MainNavigatorScreen.Screen
            name="Setting"
            component={Setting}
            options={{
              headerTitle: () => {},
              headerBackImage: () => (
                <HeaderBackImage imagePath={CloseBackImage} />
              ),
              headerBackTitleVisible: false,
              headerTransparent: true,
            }}
          />
          <MainNavigatorScreen.Screen
            name="TermsAndCondition"
            component={TermsAndCondition}
            options={{
              headerTitle: 'Terms and conditions',
              headerTitleStyle: {
                fontFamily: fontNameSetting
                  ? fontNameSetting
                  : SettingConstants.defaultFont,
                fontWeight: 'bold',
              },
              headerBackImage: () => (
                <HeaderBackImage imagePath={CloseBackImage} />
              ),
              headerBackTitleVisible: false,
              headerTintColor: Colors.HeaderTitle_gray,
              headerTransparent: true,
            }}
          />
          <MainNavigatorScreen.Screen
            name="FontSetting"
            component={FontSetting}
            options={{
              headerTitle: 'Font',
              headerTitleStyle: {
                fontFamily: fontNameSetting
                  ? fontNameSetting
                  : SettingConstants.defaultFont,
                fontWeight: 'bold',
              },
              headerBackImage: () => (
                <HeaderBackImage imagePath={BackBackImage} />
              ),
              headerBackTitleVisible: false,
              headerTintColor: Colors.HeaderTitle_gray,
              headerTransparent: true,
            }}
          />
        </MainNavigatorScreen.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default MainContainer;
