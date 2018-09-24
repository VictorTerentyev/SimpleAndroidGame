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

import { setDisplay, videoPlay } from '../actions/AppActions';

import Video from 'react-native-video';

class Intro extends PureComponent {
  render() {
    const {
      introVids: { introVids },
      display: { display },
      brightness: { brightness },
      volume: { volume },
      video: { video },
      componentWillMount,
      componentDidMount
    } = this.props;

    return (
      <View style={this.setDisplay()}>
        <TouchableOpacity style={styles.btn} onPress={() => this.introControlHandle()}>
          <Video 
            playInBackground
            playWhenInactive
            resizeMode='cover'
            source={this.props.introVids[this.state.index]}
            style={styles.backgroundVideo}
            paused={this.state.paused}
            onEnd={() => this.introControlHandle()}
            volume={this.props.volume * this.props.video}
          />
          <View style={this.setVideoBrightness()}/>
        </TouchableOpacity>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      index: 0,
      paused: false
    };
  }

  componentWillMount = () => {
    if (this.props.display === 'none') {
      this.setState({paused: true});
    }
  }

  introControlHandle = () => {
    if (this.state.index + 1 < this.props.introVids.length) {
      this.setState({index: this.state.index + 1});
    } 
    else {
      this.setState({ paused: true });
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
  display: PropTypes.string,
  brightness: PropTypes.number,
  volume: PropTypes.number,
  video: PropTypes.number,
  videoPlay: PropTypes.func,
  setDisplay: PropTypes.func,
  componentWillMount: PropTypes.func,
  componentDidMount: PropTypes.func
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