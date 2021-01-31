// Standard
import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import SQLite from 'react-native-sqlite-storage';

// Custom
import Background from './components/layout/Background';
import Colors from './constants/Colors';
import MainContainer from './navigation/MainNavigator';
import calendarReducer from './store/reducers/Calendar';
import sayingReducer from './store/reducers/Saying';
import diaryReducer from './store/reducers/Diary';
import settingsReducer from './store/reducers/Settings';
import { init } from './helpers/db';

// Redux
const rootReducer = combineReducers({
  calendar: calendarReducer,
  saying: sayingReducer,
  diary: diaryReducer,
  settings: settingsReducer
});
const middlewareEnhancer = applyMiddleware(ReduxThunk);
const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));

// App
export default function App() {
  const [initDB, setInitDB] = useState(false);
  let content;
  // DB
  global.db = SQLite.openDatabase(
    {
      name: 'dailybear.db',
      location: 'Library',
      createFromLocation: '~SQLite.db'
    },
    async () => {
      console.log("DB is initialized");
      // Init schema
      await init();
      setInitDB(true);
    },
    error => {
      console.log("ERROR: " + error);
    }
  );
  if (!initDB) {
    content = (
        <Background style={ styles.container }>
            <View style={ styles.centered }>
                <ActivityIndicator size='large' color={ Colors.HeaderTitle_gray } />
            </View>
        </Background>
    );
  } else {
    content = (
      <Provider store={ store }>
        <MainContainer />
      </Provider>
    );
  }
  return content;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
