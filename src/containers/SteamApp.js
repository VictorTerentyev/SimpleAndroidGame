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
import BackgroundVideo from '../../assets/videos/background.mp4';

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
        <ScrollView 
          contentContainerStyle={{
            flexGrow : 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignItems: 'center', 
            width: this.state.screenWidth
          }} 
        >
          <Text style={styles.welcome}>
            Welcome to Red Steam App!
          </Text>
          <Text style={styles.instructions}>Please, fill the input with interesting you Steam ID</Text>
          <LoginForm style={styles.loginForm} submit={actions.submit}/>
          <ProfilePage style={styles.profilePage}/>
          <ErrorMessage style={styles.errorMessage}/> 
        </ScrollView>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      screenWidth: Dimensions.get('window').width,
      previousAppState: 'active',
      backgroundSound: new Sound('background.mp3', Sound.MAIN_BUNDLE, (error) => {
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