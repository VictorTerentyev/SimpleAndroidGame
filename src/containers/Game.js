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

import Ship from '../components/Game/ship';
import Shot from '../components/Game/shot';
import Controller from '../components/Game/controller';

import Sound from 'react-native-sound';

class Game extends PureComponent {
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
      <View style={this.setDisplay()} renderToHardwareTextureAndroid>
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
            {Object.values(this.props.game.ships).map((e) => {
              return (
                <Ship
                  key={e.id}
                  id={e.id}
                  health={e.health}
                  position={e.position}
                  side={e.side}
                  removeShip={actions.removeShip}
                  addShot={actions.addShot}
                /> 
              );
            })}

            {Object.values(this.props.game.shots).map((e) => {
              return (
                <Shot 
                  key={e.id}
                  id={e.id}
                  positionY={e.positionY}
                  positionX={e.positionX}
                  side={e.side}
                  removeShot={actions.removeShot}
                /> 
              );
            })}
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
      state: 'deactivated',
      states: ['active', 'resumed', 'paused', 'deactivated'],
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
    this.creatEnemyShip();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.display === 'flex') {
      this.state.bgMusic.play();
    } else { 
      this.state.bgMusic.pause();
    };

    if(this.state.state !== 'active' && this.state.state !== 'resumed') {
      this.creatEnemyShip();
      this.setState({state: nextProps.game.state});
    };
  }

  initSession = (state) => {
    switch (state) {
      case 'active':
        this.setGameState(this.props.game);
        this.setBgAnimation();
        break;
      case 'resumed':
        this.setGameState(this.props.game);
        this.setBgAnimation();
        break;
      case 'paused':
        this.setGameState(this.props.game);
        Animated.timing(
          this.state.bgAnim
        ).stop();
        break;
      case 'deactivated':
        this.setGameState(this.props.game);
        Animated.timing(
          this.state.bgAnim
        ).stop();
        break;
    }
  }

  setHealth = () => {
    let array = [];
    for (let i = 0; i < this.props.game.ships[0].health; i++) {
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

  creatEnemyShip = () => {
    let context = this;
    let random = Math.random() * (15000 - 12000) + 500;
    (function loop() {
      random = Math.random() * (15000 - 12000) + 500;
      setTimeout(function() {
        if (context.props.game.state === 'active' || context.props.game.state === 'resumed') {
          context.props.addShip({
            id: context.props.game.ships.length,
            health: 3,
            position: Math.random() * Dimensions.get('window').height,
            side: 'right' 
          });
          loop();
        }
      }, random);
    }());
  }

  menuActionHandle = () => {
    this.checkBtnSoundDoublePlay();
    let obj = this.props.appDisps;
    obj.menu.menu = 'flex';
    obj.menu.main = 'flex';
    obj.game = 'none';
    this.props.setDisplays(obj);
    this.props.setGameState('paused');
    this.setState({state: 'pause'});
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
    appDisps: state.simpleAndroidGame.displays,
    display: state.simpleAndroidGame.displays.game,
    game: state.simpleAndroidGame.game,
    brightness: state.simpleAndroidGame.settings.videoSettings.Brightness
  };
};

export default connect(stateMap)(Game);

AppRegistry.registerComponent('SimpleAndroidGame', () => Game);