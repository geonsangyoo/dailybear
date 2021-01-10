// Standard
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import SQLite from 'react-native-sqlite-storage';

// Custom
import MainContainer from './navigation/MainNavigator';
import calendarReducer from './store/reducers/Calendar';
import sayingReducer from './store/reducers/Saying';
import diaryReducer from './store/reducers/Diary';
import { init } from './helpers/db';

// DB
global.db = SQLite.openDatabase(
  {
    name: 'dailybear.db',
    location: 'default',
    createFromLocation: '~SQLite.db'
  },
  () => {
    console.log("DB is initialized");
  },
  error => {
    console.log("ERROR: " + error);
  }
);

// Redux
const rootReducer = combineReducers({
  calendar: calendarReducer,
  saying: sayingReducer,
  diary: diaryReducer
});
const middlewareEnhancer = applyMiddleware(ReduxThunk);
const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));

// Init schema
init();

// App
export default function App() {
  return (
    <Provider store={ store }>
      <MainContainer />
    </Provider>
  );
}
