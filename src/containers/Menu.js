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

import {
  setMenuMusicCurrentTime
} from '../actions/AppActions';

class Menu extends PureComponent {
  render() {
    const {
      initFlag: { initFlag },
      display: { display },
      brightness: { brightness },
      musicCurrentTime: { musicCurrentTime },
      bgVideoPaused: { bgVideoPaused }
    } = this.props;

    this.state = {
      appState: AppState.currentState,
      display: 'none',
      displayFlag: true,
      bgVideoPaused: this.props.bgVideoPaused,
      bgMusic: new Sound('menu.mp3', Sound.MAIN_BUNDLE, (error) => {
        this.state.bgMusic.setNumberOfLoops(-1);
        if (this.state.appState === 'active' && this.props.initFlag === true) {
          this.state.bgMusic.play();
        };
      })
    }

    return (
      <View style={this.setDisplay()}>
        <Video 
          source={MenuBg}
          paused={this.state.bgVideoPaused}
          playWhenInactive
          repeat
          style={styles.bgVideo}
          resizeMode='cover'
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

  componentDidMount = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.display === true && this.state.displayFlag === true) {
      this.setDisplayState('flex', false);
    };
    if (nextProps.display === false && this.state.displayFlag === false) {
      this.setDisplayState('none', true);
    };
    if (nextProps.display === true && this.state.appState === 'active') {
      this.setState({bgVideoPaused: false});
      this.state.bgMusic.play();
    }
    else {
      this.setState({bgVideoPaused: true});
      this.state.bgMusic.pause();
    };
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.state.bgMusic.release();
  }

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(this.state.appState) && nextAppState === 'active' && this.props.display === 'flex') {
      this.state.bgMusic.play();
      this.setState({bgVideoPaused: false});
    }
    else {
      this.state.bgMusic.pause();
      this.setState({bgVideoPaused: true});
    };
    this.setState({appState: nextAppState});
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        display: this.state.display,
        flex: 1
      }
    });
    return styles.container;
  }

  setDisplayState = (display, flag) => {
    this.setState({
      display: display,
      displayFlag: flag
    });
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

Menu.propTypes = {
  initFlag: PropTypes.bool,
  display: PropTypes.bool,
  brightness: PropTypes.number,
  musicCurrentTime: PropTypes.number,
  bgVideoPaused: PropTypes.bool,
  setMenuMusicCurrentTime: PropTypes.func
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

const stateMap = (state) => {
  return {
    initFlag: state.simpleAndroidGame.menuInitFlag,
    musicCurrentTime: state.simpleAndroidGame.menuMusicCurrentTime,
    display: state.simpleAndroidGame.menuDisp,
    bgVideoPaused: state.simpleAndroidGame.menuPause,
    brightness: state.simpleAndroidGame.Brightness
  };
};

const mapDispatchToProps = {
  setMenuMusicCurrentTime
};

export default connect(stateMap, mapDispatchToProps)(Menu);

AppRegistry.registerComponent('SimpleAndroidGame', () => Menu);