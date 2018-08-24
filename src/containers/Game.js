import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableHighlight,
  Animated,
  Easing,
  AppState
} from 'react-native';

import * as AppActions from '../actions/AppActions';

import GameBg from '../../assets/images/staticbg.jpg';
import BtnBackgroundImage from '../../assets/images/menubtn.png';

import Sound from 'react-native-sound';

class Game extends Component {
  render() {
    const {
      appDisps: { appDisps },
      display: { display },
      game: { game },
      brightness: { brightness },
      dispatch,
      componentDidMount,
      componentWillReceiveProps
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={this.setDisplay()} renderToHardwareTextureAndroid={this.props.game.r}>
        <Animated.Image 
          style={[
            this.setBackground(),
            { 
              left: this.state.bgAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '1%'],
              }),
            }
          ]}
          resizeMode="stretch"
          source={GameBg}
        />
        <View style={this.setBgBrightness()}/>
        <View style={this.setBrightness()}>
          <View style={styles.menu}>
            <View style={styles.health}>

            </View>
            <View style={styles.menuBtn}>
              <ImageBackground style={styles.btnBgImg} source={this.state.btnBackground}>
                <TouchableHighlight 
                  style={styles.btn}
                  underlayColor="transparent"
                  onPress={() => this.menuActionHandle()}
                  onShowUnderlay={() => this.changeUnderlayHandle('#000000', BtnBackgroundImage)}
                  onHideUnderlay={() => this.changeUnderlayHandle('#fafafa', {})}
                > 
                  <Text style={this.setTextColor()}>MENU</Text>
                </TouchableHighlight>
              </ImageBackground>
            </View>
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
      btnBackground: {},
      textColor: '#fafafa',
      bgMusic: new Sound('mgame.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (!error) {
          this.state.bgMusic.setNumberOfLoops(-1);
        }
      }),
      bgAnim: new Animated.Value(0),
      menuBtnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {}),
      score: 0
    };
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.display === 'flex' && this.state.states.indexOf(this.state.state, 2)) {
      this.setState({ state: 'active' });
      this.setBgAnimation();
    } else {
      Animated.timing(
        this.state.bgAnim
      ).stop();
    }
  }

  menuActionHandle = () => {
    if (this.state.menuBtnSound.getCurrentTime !== 0) {
      this.state.menuBtnSound.stop();
      this.state.menuBtnSound.play();
    }
    this.setState({ state: 'paused' });
    let obj = this.props.appDisps;
    obj.menu.menu = 'flex';
    obj.menu.main = 'flex';
    obj.game = 'none';
    this.props.setDisplays(obj);
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

  setBgAnimation = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(
          this.state.bgAnim,
          {
            toValue: -900,
            duration: 1000,
            easing: Easing.linear,
          }
        )
      ],
      {
        useNativeDriver: true
      })
    ).start();
  }

  setBackground = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        width: '1000%',
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

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(this.state.appState) && nextAppState === 'active') {
      this.state.bgMusic.play();
    } else {
      this.state.bgMusic.pause();
    }
    this.setState({appState: nextAppState});
  }

  changeUnderlayHandle = (color, img) => {
    this.setState({
      btnBackground: img,
      textColor: color
    });
  }

  setTextColor = () => {
    const styles = StyleSheet.create({
      textColor: {
        fontFamily: 'Eurostile',
        fontSize: 20,
        color: this.state.textColor
      }
    });
    return styles.textColor;
  }
}

Game.propTypes = {
  appDisps: PropTypes.object,
  display: PropTypes.string,
  game: PropTypes.object,
  brightness: PropTypes.number,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    height: '10%',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    flexDirection: 'row'  
  },
  game: {
    width: '100%',
    height: '90%',
  },
  health: {
    width: '20%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'  
  },
  menuBtn: {
    width: '20%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center', 
    width: '100%',
    height: '100%'
  },
  btnBgImg: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-end' 
  }
});

const stateMap = (state) => {
  return {
    appDisps: state.simpleAndroidGame.displays,
    display: state.simpleAndroidGame.displays.game,
    game: state.simpleAndroidGame.game,
    brightness: state.simpleAndroidGame.settings.videoSettings.Brightness
  };
};

export default connect(stateMap)(Game);

AppRegistry.registerComponent('SimpleAndroidGame', () => Game);