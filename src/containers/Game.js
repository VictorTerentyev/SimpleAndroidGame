import React, { PureComponent } from 'react';
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
  AppState,
  Dimensions
} from 'react-native';

import * as AppActions from '../actions/AppActions';

import ShipsList from '../components/Game/shipsList';
import ShotsList from '../components/Game/shotsList';
import Controller from '../components/Game/controller';

import Sound from 'react-native-sound';

class Game extends PureComponent {
  render() {
    const {
      state: { state },
      ships: { ships },
      display: { display },
      brightness: { brightness },
      dispatch,
      componentDidMount,
      componentWillReceiveProps
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={this.setDisplay()}>
        <Animated.Image 
          style={[
            this.setBackground(),
            { 
              left: this.state.bgAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '1%'],
              })
            }
          ]}
          resizeMode="stretch"
          source={{uri: 'staticbg'}}
        />
        <View style={this.setBgBrightness()}/>
        <View style={this.setBrightness()}>
          <View style={styles.menu}>
            <View style={styles.health}>
              {this.state.hitPoints.map(e => {
                return (e);
              })}
            </View>
            <View style={styles.menuBtn}>
              <ImageBackground style={styles.btnBgImg} source={this.state.btnBackground}>
                <TouchableHighlight 
                  style={styles.btn}
                  underlayColor="transparent"
                  onPress={() => this.menuActionHandle()}
                  onShowUnderlay={() => this.changeUnderlayHandle('#000000', {uri: 'menubtn'})}
                  onHideUnderlay={() => this.changeUnderlayHandle('#fafafa', {})}
                > 
                  <Text style={this.setTextColor()}>MENU</Text>
                </TouchableHighlight>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.game}>
            <ShipsList addShip={actions.addShip}/>
            <ShotsList />
          </View>
        </View>
        <Controller
          setPosition={actions.setPosition}
          addShot={actions.addShot}
        />
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      textColor: '#fafafa',
      btnBackground: {},
      bgMusic: new Sound('mgame.mp3', Sound.MAIN_BUNDLE, (error) => {this.state.bgMusic.setNumberOfLoops(-1)}),
      btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {}),
      bgAnim: new Animated.Value(0),
      hitPoints: [],
      score: 0
    };
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentDidMount = () => {
    this.setBgAnimation();
    this.setHealth();
  }

  componentWillReceiveProps(nextProps) {
    alert(this.props.positionY);
    if(nextProps.display === 'flex') {
      this.state.bgMusic.play();
    } else { 
      this.state.bgMusic.pause();
    };
  }

  setHealth = () => {
    let array = [];
    for (let i = 0; i < this.props.ships[0].health; i++) {
      array.push(
        <Image 
          key={i}
          style={styles.hitPoint}
          source={{uri: 'hitpoint'}}
          resizeMode="contain"
        />
      );
    };
    this.setState({ hitPoints: array });
  }

  menuActionHandle = () => {
    this.checkBtnSoundDoublePlay();
    this.props.setDisplay('menuDisp', 'flex');
    this.props.setDisplay('mainDisp', 'flex');
    this.props.setDisplay('gameDisp', 'none');
    this.props.setGameState('paused');
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
      this.state.btnSound.play();
    } else {
      this.state.bgMusic.pause();
      this.state.btnSound.pause();
    }
    this.setState({appState: nextAppState});
  }

  checkBtnSoundDoublePlay = () => {
    if (this.state.btnSound.getCurrentTime !== 0) {
      this.state.btnSound.stop();
      this.state.btnSound.play();
    }
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
  state: PropTypes.string,
  ships: PropTypes.array,
  display: PropTypes.string,
  brightness: PropTypes.number,
  setGameState: PropTypes.func,
  setDisplay: PropTypes.func,
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
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems: 'flex-start'  
  },
  hitPoint: {
    height: '100%',
    width: '33%',
    marginLeft: '5%'
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
    state: state.simpleAndroidGame.state,
    ships: state.simpleAndroidGame.ships,
    display: state.simpleAndroidGame.gameDisp,
    brightness: state.simpleAndroidGame.Brightness
  };
};

export default connect(stateMap)(Game);

AppRegistry.registerComponent('SimpleAndroidGame', () => Game);