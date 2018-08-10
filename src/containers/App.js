import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import  from './SteamApp';

import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends Component {
  render() {
    return (
      <View styles={styles.main}>
        <Provider store={store}>
          <SteamApp />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {

  }
});

AppRegistry.registerComponent('RedSteamApp', () => App);