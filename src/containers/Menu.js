import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  SectionList,
  Dimensions,
  AppState
} from 'react-native';

import Video from 'react-native-video';
import Menu from '../../assets/videos/menu.mp4';

import Sound from 'react-native-sound';

import MainMenu from '../components/Menu/main';
import Settings from '../components/Menu/settings';
import Credits from '../components/Menu/credits';
import Exit from '../components/Menu/exit';

class menu extends Component {
  render() {
    const { menuState: { menuState }, dispatch, componentDidMount } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.container}>
        <Video 
          playInBackground
          playWhenInactive
          resizeMode='cover'
          source={this.state.source}
          style={styles.backgroundVideo}
        />
        <MainMenu />
        <Settings />
        <Credits />
        <Exit />
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      source: Menu,
      menuState: AppState.currentState,
      backgroundSound: new Sound('background.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (!error) {
          this.state.backgroundSound.setNumberOfLoops(-1);
          this.state.backgroundSound.play();
        } 
      })
    }
  }
}

menu.propTypes = {
  menuState: PropTypes.object,
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
    menuState: state.menu
  };
};

export default connect(stateMap)(menu);