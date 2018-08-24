import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  AppState
} from 'react-native';

import * as AppActions from '../actions/AppActions';

import Intro from './Intro';
import Menu from './Menu';
import Game from './Game';

class MainContainer extends Component {
  render() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <Intro setDisplays={actions.setDisplays} videoPlay={actions.videoPlay}/>
        <Menu />
        <Game setDisplays={actions.setDisplays}/>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  }
});

MainContainer.propTypes = {
  appProps: PropTypes.object,
  dispatch: PropTypes.func
}

const stateMap = (state) => {
  return {
    appProps: state.simpleAndroidGame
  };
};

export default connect(stateMap)(MainContainer);

AppRegistry.registerComponent('SimpleAndroidGame', () => MainContainer);