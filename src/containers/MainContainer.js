/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  AppState
} from 'react-native';

import Orientation from 'react-native-orientation';

import * as AppActions from '../actions/AppActions';

import Intro from './Intro';
import Menu from './Menu';
import Game from './Game';

class MainContainer extends Component {
  render() {
    const { appProps: { appProps }, dispatch, componentDidMount } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.container}>
        <Intro setDisplays={actions.setDisplays}/>
        <Game />
      </View>
    );
  }

  componentDidMount() {
    Orientation.lockToLandscapeLeft();
  }
}

MainContainer.propTypes = {
  appProps: PropTypes.object,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignSelf: 'stretch',
    width: 300,
    height: 300 
  }
});

const stateMap = (state) => {
  return {
    appProps: state.simpleAndroidGame
  };
};

export default connect(stateMap)(MainContainer);

AppRegistry.registerComponent('SimpleAndroidGame', () => MainContainer);