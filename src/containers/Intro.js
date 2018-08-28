import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  AppState
} from 'react-native';

import * as AppActions from '../actions/AppActions';

import Video from 'react-native-video';

class Intro extends PureComponent {
  render() {
    const {
      introVids: { introVids },
      appDisps: { appDisps },
      display: { display },
      brightness: { brightness },
      audioSettings: { audioSettings },

      dispatch
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
            volume={this.props.audioSettings.Volume * this.props.audioSettings.video}
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

  introControlHandle = () => {
    if (this.state.index + 1 < this.props.introVids.length) {
      this.setState({index: this.state.index + 1});
    } 
    else {
      this.setState({ paused: true });
      this.props.videoPlay({ intro: true, menu: false });
      let obj = this.props.appDisps;
      obj.intro = 'none';
      obj.menu.menu = 'flex';
      obj.menu.main = 'flex';
      this.props.setDisplays(obj);
    }
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


Intro.propTypes = {
  introVids: PropTypes.array,
  appDisps: PropTypes.object,
  display: PropTypes.string,
  brightness: PropTypes.number,
  audioSettings: PropTypes.object,
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
  btn: {
    flex: 1
  }
});

const stateMap = (state) => {
  return {
    introVids: state.simpleAndroidGame.introVids,
    appDisps: state.simpleAndroidGame.displays,
    display: state.simpleAndroidGame.displays.intro,
    brightness: state.simpleAndroidGame.settings.videoSettings.Brightness,
    audioSettings: state.simpleAndroidGame.settings.audioSettings
  };
};

export default connect(stateMap)(Intro);

AppRegistry.registerComponent('SimpleAndroidGame', () => Intro);