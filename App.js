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

SQLite.DEBUG(true);

// Redux
const rootReducer = combineReducers({
  calendar: calendarReducer
});
const middlewareEnhancer = applyMiddleware(ReduxThunk);
const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));

// App
export default function App() {
  return (
    <Provider store={ store }>
      <MainContainer />
    </Provider>
  );
}
