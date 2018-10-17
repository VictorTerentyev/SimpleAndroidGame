import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  AppState
} from 'react-native';

import { Immersive } from 'react-native-immersive';

import {
  videoPlay,
  setIntroVideosCurrentIndex,
  setIntroVideosCurrentTime,
  setMenuInitFlag,
  setDisplay
} from '../actions/AppActions';

import Video from 'react-native-video';

class Intro extends PureComponent {
  render() {
    const {
      introVids: { introVids },
      introVidsCurrentIndex: { introVidsCurrentIndex },
      introVidsCurrentTime: { introVidsCurrentTime },
      introPause: { introPause },
      display: { display },
      brightness: { brightness },
      volume: { volume },
      video: { video }
    } = this.props;

    return (
      <View style={this.setDisplay()}>
        <TouchableOpacity style={styles.btn} onPress={() => this.introControlHandle()}>
          <Video
            source={this.props.introVids[this.props.introVidsCurrentIndex]}
            onLoad={this.introLoad}
            onProgress={this.introProgress}
            onEnd={() => this.introControlHandle()}
            paused={this.props.introPause}
            volume={this.props.volume * this.props.video}
            playWhenInactive
            style={styles.backgroundVideo}
            resizeMode='cover'
            ref={(ref) => this.player = ref}
          />
          <View style={this.setVideoBrightness()}/>
        </TouchableOpacity>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      appState: 'background',
      display: 'flex',
      displayFlag: false
    };
  }

  componentWillMount = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentDidMount = () => {
    if (this.props.display === true) {
      this.player.seek(this.props.introVidsCurrentTime);
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.display === true && this.state.displayFlag === true) {
      this.setDisplayState('flex', false);
    };
    if (nextProps.display === false && this.state.displayFlag === false) {
      this.setDisplayState('none', true);
    };
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(this.state.appState) && nextAppState === 'active' && this.props.display === true) {
      this.props.videoPlay('introPause', false);
    }
    else {
      this.props.videoPlay('introPause', true);
    };
    this.setState({appState: nextAppState});
  }

  introLoad = () => {
    this.player.seek(this.props.introVidsCurrentTime);
  }

  introProgress = (progress) => {
    this.props.setIntroVideosCurrentTime(progress.currentTime);
  }

  introControlHandle = () => {
    if (this.props.introVidsCurrentIndex + 1 < this.props.introVids.length) {
      this.props.setIntroVideosCurrentTime(0.0);
      this.props.setIntroVideosCurrentIndex(this.props.introVidsCurrentIndex + 1);
    } 
    else {
      this.props.setMenuInitFlag(true);
      this.props.videoPlay('introPause', true);
      this.props.videoPlay('menuPause', false);
      this.props.setDisplay('introDisp', false);
      this.props.setDisplay('menuDisp', true);
      this.props.setDisplay('mainDisp', true);
    };
  }

  setDisplay = () => {
    Immersive.on();
    Immersive.setImmersive(true);
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

Intro.propTypes = {
  introVids: PropTypes.array,
  introVidsCurrentIndex: PropTypes.number,
  introVidsCurrentTime: PropTypes.number,
  introPause: PropTypes.bool,
  display: PropTypes.bool,
  brightness: PropTypes.number,
  volume: PropTypes.number,
  video: PropTypes.number,
  videoPlay: PropTypes.func,
  setIntroVideosCurrentIndex: PropTypes.func,
  setIntroVideosCurrentTime: PropTypes.func,
  setMenuInitFlag: PropTypes.func,
  setDisplay: PropTypes.func
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: -2,
    right: 0
  },
  btn: {
    flex: 1
  }
});

const stateMap = (state) => {
  return {
    introVids: state.simpleAndroidGame.introVids,
    introVidsCurrentIndex: state.simpleAndroidGame.introVidsCurrentIndex,
    introVidsCurrentTime: state.simpleAndroidGame.introVidsCurrentTime,
    introPause: state.simpleAndroidGame.introPause,
    display: state.simpleAndroidGame.introDisp,
    brightness: state.simpleAndroidGame.Brightness,
    volume: state.simpleAndroidGame.Volume,
    video: state.simpleAndroidGame.Video
  };
};

const mapDispatchToProps = {
  videoPlay,
  setIntroVideosCurrentIndex,
  setIntroVideosCurrentTime,
  setMenuInitFlag,
  setDisplay
};

export default connect(stateMap, mapDispatchToProps)(Intro);

AppRegistry.registerComponent('SimpleAndroidGame', () => Intro);