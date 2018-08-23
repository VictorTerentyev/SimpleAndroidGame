import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  AppState
} from 'react-native';

import * as AppActions from '../actions/AppActions';

import GameBg from '../../assets/images/staticbg.jpg';

import Sound from 'react-native-sound';

class Game extends Component {
  render() {
    const { 
      display: { display },
      game: { game },
      brightness: { brightness },
      dispatch,
      componentDidMount,
      componentWillReceiveProps
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={this.setDisplay()}>
        <Animated.Image style={this.setBackground()} resizeMode="cover" source={GameBg}/>
        <View style={this.setBgBrightness()}/>
        <View style={this.setBrightness()}>
          <View style={styles.menu}>
              
          </View>
          <View style={styles.game}>
              
          </View>
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      state: this.props.game.state,
      states: ['active', 'resumed', 'paused', 'deactivated'],
      bgMusic: new Sound('mgame.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (!error) {
          this.state.bgMusic.setNumberOfLoops(-1);
        }
      }),
      bgPosition: 0,
      score: 0
    };
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.display === 'flex' && !this.state.states.indexOf(this.state.state, 2)) {
      this.setState({ state: 'active' })
    }
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        display: this.props.display
      }
    });
    return styles.container;
  }

  setBackground = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        left: this.state.bgPosition,
        width: '200%',
        height: '100%'
      }
    });
    return styles.container;
  }

  setBrightness = () => {
    let styles = StyleSheet.create({
      container: {
        flex: 1,
        opacity: this.props.brightness
      }
    });
    return styles.container;
  }

  setBgBrightness = () => {
    let styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 1 - this.props.brightness
      }
    });
    return styles.container;
  }

  setBackgroundAnimation = () => {

  }

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(this.state.appState) && nextAppState === 'active') {
      this.state.bgMusic.play();
    } else {
      this.state.bgMusic.pause();
    }
    this.setState({appState: nextAppState});
  }
}



Game.propTypes = {
  display: PropTypes.string,
  game: PropTypes.object,
  brightness: PropTypes.number,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    height: '10%',
    backgroundColor: '#000000'
  },
  game: {
    width: '100%',
    height: '90%',
  },
});

const stateMap = (state) => {
  return {
    display: state.simpleAndroidGame.displays.game,
    game: state.simpleAndroidGame.game,
    brightness: state.simpleAndroidGame.settings.videoSettings.brightness
  };
};

export default connect(stateMap)(Game);

AppRegistry.registerComponent('SimpleAndroidGame', () => Game);