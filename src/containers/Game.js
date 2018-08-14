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

import * as AppActions from '../actions/AppActions';

import Video from 'react-native-video';

import Sound from 'react-native-sound';

class Game extends Component {
  render() {
    const { appProps: { appProps }, gameDisp: { gameDisp }, dispatch } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={setStyles(this.props.gameDisp)}>

      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      
    }
  }
}

function setStyles(display) {
  const styles = StyleSheet.create({
    container: {
      display: display
    }
  });
  return styles.container;
}

Game.propTypes = {
  appProps: PropTypes.object,
  gameDisp: PropTypes.string,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: -2,
    right: 0
  },
  backgroundMusic: {
    display: 'none'
  }
});

const stateMap = (state) => {
  return {
    appProps: state.simpleAndroidGame,
    gameDisp: state.simpleAndroidGame.displays.game
  };
};

export default connect(stateMap)(Game);

AppRegistry.registerComponent('SimpleAndroidGame', () => Game);