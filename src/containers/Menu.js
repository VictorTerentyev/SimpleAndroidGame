import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  SectionList,
  AppState
} from 'react-native';

import Video from 'react-native-video';
import MenuBg from '../../assets/videos/menu.mp4';

import Sound from 'react-native-sound';

import MainMenu from '../components/Menu/main';
import Settings from '../components/Menu/settings';
import VideoSettings from '../components/Menu/videoSettings';
import AudioSettings from '../components/Menu/audioSettings';
import GameplaySettings from '../components/Menu/gameplaySettings';
import Credits from '../components/Menu/credits';
import Exit from '../components/Menu/exit';

class Menu extends PureComponent {
  render() {
    const {
      display: { display }, 
      bgPaused: { bgPaused },
      brightness: { brightness },
      componentWillMount,
      componentWillReceiveProps,
      componentWillUnmount
    } = this.props;

    return (
      <View style={this.setDisplay()}>
        <Video 
          repeat
          paused={this.props.bgPaused}
          playInBackground
          playWhenInactive
          resizeMode='cover'
          source={MenuBg}
          style={styles.bgVideo}
        />
        <View style={this.setVideoBrightness()}/>
        <MainMenu/>
        <Settings/>
        <VideoSettings/>
        <AudioSettings/>
        <GameplaySettings/>
        <Credits/>
        <Exit/>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      appState: AppState.currentState,
      bgMusic: new Sound('menu.mp3', Sound.MAIN_BUNDLE, (error) => {this.state.bgMusic.setNumberOfLoops(-1)})
    };
  }

  componentWillMount = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentDidMount = () => {
    this.state.bgMusic.play();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.display === 'flex') {
      this.state.bgMusic.play();
    } 
    else { 
      this.state.bgMusic.pause();
    };
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.state.bgMusic.pause();
  }

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(this.state.appState) && nextAppState === 'active') {
      this.state.bgMusic.play();
    } else {
      this.state.bgMusic.pause();
      console.log('TRIGGERED + ' + nextAppState);
    };
    this.setState({appState: nextAppState});
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        display: this.props.display,
        flex: 1
      }
    });
    return styles.container;
  }

  setVideoBrightness = () => {
    let styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: -2,
        backgroundColor: '#000000',
        opacity: 1 - this.props.brightness
      }
    });
    return styles.container;
  }
}

let styles = StyleSheet.create({
  bgVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -2,
    zIndex: -1
  }
});

Menu.propTypes = {
  display: PropTypes.string,
  bgPaused: PropTypes.bool,
  brightness: PropTypes.number,
  componentWillMount: PropTypes.func,
  componentWillReceiveProps: PropTypes.func,
  componentWillUnmount: PropTypes.func
}

const stateMap = (state) => {
  return {
    display: state.simpleAndroidGame.menuDisp,
    bgPaused: state.simpleAndroidGame.menuPause,
    brightness: state.simpleAndroidGame.Brightness,
  };
};

export default connect(stateMap)(Menu);

AppRegistry.registerComponent('SimpleAndroidGame', () => Menu);