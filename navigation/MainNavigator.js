// Standard
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Custom
import CalendarView from '../screens/main/CalendarView';
import DayDetail from '../screens/main/DayDetail';
import ListView from '../screens/main/ListView';
import SayingDetail from '../screens/main/SayingDetail';
import StatisticsView from '../screens/main/StatisticsView';

const MainNavigatorScreen = createStackNavigator();
const MainContainer = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <MainNavigatorScreen.Navigator
                    mode="card"
                    headerMode="none"
                    initialRouteName="CalendarView"
                >
                    <MainNavigatorScreen.Screen 
                        name="CalendarView"
                        component={ CalendarView }
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
                    />
                    <MainNavigatorScreen.Screen 
                        name="DayDetail"
                        component={ DayDetail }
                    />
                </MainNavigatorScreen.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default MainContainer;