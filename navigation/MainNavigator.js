// Standard
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Custom
import CalendarView from '../screens/main/CalendarView';
import ListView from '../screens/main/ListView';
import SayingDetail from '../screens/main/SayingDetail';
import StatisticsView from '../screens/main/StatisticsView';
import HeaderBackImage from '../components/layout/HeaderBackImage';
import DiaryIntro from '../screens/main/DiaryIntro';
import DiaryDetail from '../screens/main/DiaryDetail';
import Colors from '../constants/Colors';

const MainNavigatorScreen = createStackNavigator();
const SayingDetailBackImage = require('../assets/icons/back.png');

const MainContainer = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <MainNavigatorScreen.Navigator
                    mode="card"
                    headerMode="screen"
                    initialRouteName="CalendarView"
                >
                    <MainNavigatorScreen.Screen 
                        name="CalendarView"
                        component={ CalendarView }
                        options={{
                            headerShown: false
                        }}
                    />
                    <MainNavigatorScreen.Screen 
                        name="DiaryIntro"
                        component={ DiaryIntro }
                        options={{
                            headerTitle: () => {},
                            headerBackTitleVisible: false,
                            headerTintColor: Colors.HeaderTitle_gray,
                            headerTransparent: true
                        }}
                    />
                    <MainNavigatorScreen.Screen 
                        name="DiaryDetail"
                        component={ DiaryDetail }
                        options={{
                            headerTitle: () => {},
                            headerBackTitleVisible: false,
                            headerTintColor: Colors.HeaderTitle_gray,
                            headerTransparent: true
                        }}
                    />
                    <MainNavigatorScreen.Screen 
                        name="StatisticsView"
                        component={ StatisticsView }
                    />
                    <MainNavigatorScreen.Screen 
                        name="ListView"
                        component={ ListView }
                    />
                    <MainNavigatorScreen.Screen 
                        name="SayingDetail"
                        component={ SayingDetail }
                        options={{
                            headerTitle: "A word of this month",
                            headerBackImage: () => <HeaderBackImage imagePath={ SayingDetailBackImage } />,
                            headerBackTitleVisible: false,
                            headerTintColor: Colors.HeaderTitle_gray,
                            headerTransparent: true
                        }}
                    />
                </MainNavigatorScreen.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default MainContainer;