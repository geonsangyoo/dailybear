// Standard
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Custom
import MainContainer from './navigation/MainNavigator';

// const rootReducer = combineReducers({
// });
// const middlewareEnhancer = applyMiddleware(ReduxThunk);
// const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));

export default function App() {
  return (
    // <Provider store={ store }>
    //   <MainContainer />
    // </Provider>
    <MainContainer />
  );
}
