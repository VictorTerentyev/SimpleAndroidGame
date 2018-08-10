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
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  AppState
} from 'react-native';

import Video from 'react-native-video';
import NVidia_Intro from '../../assets/videos/nvidia.mp4';
import AMD_Intro from '../../assets/videos/amd.mp4';
import UE4_Intro from '../../assets/videos/ue4.mp4';
import Frontier_Intro from '../../assets/videos/frontier.mp4';
import Menu_Background from '../../assets/videos/menu.mp4';


import Sound from 'react-native-sound';

import * as AppActions from '../actions/AppActions';

import LoginForm from '../components/LoginForm';
import ProfilePage from '../components/ProfilePage';
import ErrorMessage from '../components/ErrorMessage';

class SteamApp extends Component {
  render() {
    const { profileInfo: { profileInfo }, dispatch, componentDidMount } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.container}>
        <Video
          repeat
          playInBackground
          playWhenInactive
          resizeMode='cover'
          source={BackgroundVideo}
          style={styles.backgroundVideo}
        />
        <View
          style={{
            flexGrow : 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignItems: 'center', 
            width: this.state.screenWidth
          }} 
        >
        </View>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      screenWidth: Dimensions.get('window').width,
      previousAppState: 'active',
      MenuBackgroundSound: new Sound('background.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (!error) {
          this.state.backgroundSound.setNumberOfLoops(-1);
          this.state.backgroundSound.play();
        } 
      })
    }

    Dimensions.addEventListener('change', () => {
      this.setState({screenWidth: Dimensions.get('window').width});
    })
  }

  componentDidMount() {
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        if (this.state.previousAppState === 'background' || this.state.previousAppState === 'inactive') {
          this.state.backgroundSound.play();
          this.setState({ previousAppState: 'active'});
        }
      } 
      if (state === 'background') {
        this.state.backgroundSound.pause();
        this.setState({ previousAppState: 'background'});
      }
    });
  }
}

SteamApp.propTypes = {
  profileInfo: PropTypes.object,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d80000'
  },
  welcome: {
    fontFamily: 'Pixel LCD-7',
    fontSize: 18,
    color: '#ffee0a',
    textAlign: 'center',
    marginTop: 20,
    width: 320
  },
  instructions: {
    fontFamily: 'Pixel LCD-7',
    fontSize: 14,
    color: '#ffee0a',
    textAlign: 'center',
    marginTop: 10,
    width: 320
  },
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
        profileInfo: state.steamApp
    };
};

export default connect(stateMap)(SteamApp);