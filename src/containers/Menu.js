import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  SectionList,
  Dimensions,
  AppState
} from 'react-native';

import * as AppActions from '../actions/AppActions';

import Video from 'react-native-video';
import MenuBg from '../../assets/videos/menu.mp4';

import Sound from 'react-native-sound';

import MainMenu from '../components/Menu/main';
import Settings from '../components/Menu/settings';
import Credits from '../components/Menu/credits';
import Exit from '../components/Menu/exit';

class Menu extends Component {
  render() {
    const { 
      appProps: { appProps }, 
      display: { display }, 
      bgPaused: { bgPaused },
      componentWillReceiveProps,
      dispatch
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={setStyles(this.props.display)}>
        <Video 
          repeat
          paused={this.props.bgPaused}
          playInBackground
          playWhenInactive
          resizeMode='cover'
          source={MenuBg}
          style={styles.backgroundVideo}
        />
        <MainMenu setDisplays={actions.setDisplays}/>
        <Settings setDisplays={actions.setDisplays}/>
        <Credits setDisplays={actions.setDisplays}/>
        <Exit setDisplays={actions.setDisplays}/>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      appState: AppState.currentState,
      bgMusic: new Sound('menu.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (!error) {
          this.state.bgMusic.setNumberOfLoops(-1);
        }
      })
    };
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.display === 'flex') {
      this.state.bgMusic.play();
    } 
    else { 
      this.state.bgMusic.pause();
    }
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

function setStyles(display) {
  const styles = StyleSheet.create({
    container: {
      display: display,
      flex: 1
    }
  });
  return styles.container;
}

Menu.propTypes = {
  appProps: PropTypes.object,
  display: PropTypes.string,
  bgPaused: PropTypes.bool,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: -2,
    right: 0
  }
});

const stateMap = (state) => {
  return {
    appProps: state.simpleAndroidGame,
    display: state.simpleAndroidGame.displays.menu.menu,
    bgPaused: state.simpleAndroidGame.videoPaused.menu
  };
};

export default connect(stateMap)(Menu);

AppRegistry.registerComponent('SimpleAndroidGame', () => Menu);