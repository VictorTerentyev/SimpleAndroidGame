import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import SteamApp from './src/containers/SteamApp';

import * as reducers from './src/reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer, applyMiddleware(thunk));

const SimpleAndroidGame = () => (
  <Provider store={store}>
    <SteamApp />
  </Provider>
)

AppRegistry.registerComponent('SimpleAndroidGame', () => SimpleAndroidGame);
