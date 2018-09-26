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
  setDisplay,
  videoPlay
} from '../actions/AppActions';

import Video from 'react-native-video';

class Intro extends PureComponent {
  render() {
    const {
      introVids: { introVids },
      introPause: { introPause },
      display: { display },
      brightness: { brightness },
      volume: { volume },
      video: { video },
      componentWillMount,
      componentWillReceiveProps,
      componentWillUnmount
    } = this.props;

    return (
      <View style={this.setDisplay()}>
        <TouchableOpacity style={styles.btn} onPress={() => this.introControlHandle()}>
          <Video 
            source={this.props.introVids[this.state.index]}
            paused={this.state.paused}
            playWhenInactive
            onEnd={() => this.introControlHandle()}
            volume={this.props.volume * this.props.video}
            style={styles.backgroundVideo}
            resizeMode='cover'
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
      paused: false,
      index: 0
    };
  }

  componentWillMount = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.introPause === true) {
      this.setState({paused: true});
    };
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(this.state.appState) && nextAppState === 'active' && this.props.display === 'flex') {
      this.setState({paused: false});
    }
    else {
      this.setState({paused: true});
    };
    this.setState({appState: nextAppState});
  }

  introControlHandle = () => {
    if (this.state.index + 1 < this.props.introVids.length) {
      this.setState({index: this.state.index + 1});
    } 
    else {
      this.props.videoPlay('introPause', true);
      this.props.videoPlay('menuPause', false);
      this.props.setDisplay('introDisp', 'none');
      this.props.setDisplay('menuDisp', 'flex');
      this.props.setDisplay('mainDisp', 'flex');
    }
  }

  setDisplay = () => {
    Immersive.on();
    Immersive.setImmersive(true);
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

Intro.propTypes = {
  introVids: PropTypes.array,
  introPause: PropTypes.bool,
  display: PropTypes.string,
  brightness: PropTypes.number,
  volume: PropTypes.number,
  video: PropTypes.number,
  videoPlay: PropTypes.func,
  setDisplay: PropTypes.func,
  componentWillMount: PropTypes.func,
  componentWillReceiveProps: PropTypes.func,
  componentWillUnmount: PropTypes.func
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
    introPause: state.simpleAndroidGame.introPause,
    display: state.simpleAndroidGame.introDisp,
    brightness: state.simpleAndroidGame.Brightness,
    volume: state.simpleAndroidGame.Volume,
    video: state.simpleAndroidGame.Video
  };
};

const mapDispatchToProps = {
  setDisplay,
  videoPlay
};

export default connect(stateMap, mapDispatchToProps)(Intro);

AppRegistry.registerComponent('SimpleAndroidGame', () => Intro);