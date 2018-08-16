import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  AppState
} from 'react-native';

import * as AppActions from '../actions/AppActions';

import Video from 'react-native-video';

class Intro extends Component {
  render() {
    const { introVids: { introVids }, introDisp: { introDisp }, dispatch } = this.props;

    return (
      <View style={this.setDisplay(this.props.introDisp)}>
        <TouchableOpacity style={styles.button} onPress={() => this.introControlHandle()}>
          <Video 
            playInBackground
            playWhenInactive
            resizeMode='cover'
            source={this.props.introVids[this.state.index]}
            style={styles.backgroundVideo}
            paused={this.state.paused}
            onEnd={() => this.introControlHandle()}
          />
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
      this.props.setDisplays({
        intro: 'none',
        game: 'none',
        menu: {
          menu: 'flex',
          main: 'flex',
          settings: 'none',
          credits: 'none',
          exit: 'none'
        }
      });
    }
  }

  setDisplay = (display) => {
    const styles = StyleSheet.create({
      container: {
        display: display,
        flex: 1
      }
    });
    return styles.container;
  }
}


Intro.propTypes = {
  introVids: PropTypes.array,
  introDisp: PropTypes.string,
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
  button: {
    flex: 1
  }
});

const stateMap = (state) => {
  return {
    introVids: state.simpleAndroidGame.introVids,
    introDisp: state.simpleAndroidGame.displays.intro,
  };
};

export default connect(stateMap)(Intro);

AppRegistry.registerComponent('SimpleAndroidGame', () => Intro);