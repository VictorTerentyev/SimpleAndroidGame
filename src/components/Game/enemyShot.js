import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Animated,
  Dimensions,
  Easing,
  AppState
} from 'react-native';

import {
  setDisplay,
  setGameState,
  setShipHitpoints,
  removeEnemyShot
} from '../../actions/AppActions';

import Sound from 'react-native-sound';

class EnemyShot extends PureComponent {
  render() {
    const {
      state: { state },
      hitpoints: { hitpoints },
      currentPosition: { currentPosition }
    } = this.props;

    this.state = {
      appState: AppState.currentState,
      screenWidth: Dimensions.get('window').width,
      shotHeight: Dimensions.get('window').height * 0.06,
      shipWidth: Dimensions.get('window').width * 0.9,
      shipHeight: Dimensions.get('window').height * 0.2,
      shotPosAnim: new Animated.Value(this.props.positionX),
      shotBgAnim: new Animated.Value(0),
      resumedFlag: false,
      shotSound: new Sound('eshot.mp3', Sound.MAIN_BUNDLE, (error) => {
        this.checkSoundDoublePlay(this.state.shotSound)
      }),
      boomSound: new Sound('boom.mp3', Sound.MAIN_BUNDLE, (error) => {})
    };

    return (
      <Animated.View
        style={[
          this.setDisplay(),
          {
            right: this.state.shotPosAnim
          }
        ]}
      >
        <Animated.Image
          style={[
            styles.image,
            {transform: [{translateX: this.state.shotBgAnim}]}
          ]}
          source={{uri: 'red_shot'}}
          resizeMode="cover"
        />
      </Animated.View>
    );
  }

  constructor = () => {
    this.positionX = 0;
  }

  componentWillMount = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.setListener();
    this.setAnimation();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.state === 'deactivated') {
      AppState.removeListener(this.state.shotPosAnim);
    };
    if (nextProps.state === 'paused') {
      this.pausedActionHandle(); 
    };
    if (nextProps.state === 'resumed') {
      this.resumedActionHandle();
    };
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
    AppState.removeListener(this.state.shotPosAnim);
  }

  handleAppStateChange = (nextAppState) => {
    if (['active', 'resumed'].includes(this.props.state) && !['background', 'inactive'].includes(this.state.appState) && nextAppState !== 'active') {
      this.state.shotSound.pause();
      this.state.boomSound.pause();
    }
    this.setState({appState: nextAppState});
  }

  setListener = () => {
    this.state.shotPosAnim.addListener(({value}) => {
      this.positionX = value;
      this.checkDamage(value);
    });
  }

  pausedActionHandle = () => {
    this.setState({
        shotPosAnim: new Animated.Value(this.positionX),
        resumedFlag: false
      });
    AppState.removeListener(this.state.shotPosAnim); 
  }

  resumedActionHandle = () => {
    if (this.state.resumedFlag === false) {
      this.setState({resumedFlag: true});
      this.setListener();
      this.setAnimation();
      if (this.state.shotSound.getCurrentTime !== 0) {
        this.state.shotSound.play();
      }
      if (this.state.boomSound.getCurrentTime !== 0) {
        this.state.boomSound.play();
      }
    }
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: this.props.positionY,
        width: '10%',
        height: '6%'
      }
    });
    return styles.container;
  }

  setAnimation = () => {
    let value = this.state.screenWidth + 200 + this.positionX;
    Animated.parallel([
      Animated.timing(
        this.state.shotPosAnim,
        {
          toValue: value,
          duration: 1000,
          easing: Easing.linear,
        }
      ),
      Animated.timing(
        this.state.shotBgAnim,
        {
          toValue: -15,
          duration: 2000,
          easing: Easing.linear,
        }
      )
    ],
    {
      useNativeDriver: true
    }).start(() => {
      if (this.positionX > this.state.screenWidth) {
        this.props.removeEnemyShot(this.props.id);
      }
    });
  }

  checkSoundDoublePlay = (sound) => {
    sound.stop();
    sound.play(() => {sound.release()});
  }

  checkDamage = (positionX) => {
    //shot and ship cords
    let shotLeft = positionX;
    let shotTop = this.props.positionY;
    let shotBottom = this.props.positionY + this.state.shotHeight;
    let shipRight = this.state.shipWidth;
    let shipLeft = this.state.screenWidth;
    let shipTop = this.props.currentPosition;
    let shipBottom = this.props.currentPosition + this.state.shipHeight;
    //check positions
    if (shotLeft >= shipRight && shotLeft <= shipLeft) {
      if (shotBottom >= shipTop && shotTop <= shipBottom) {
        this.checkSoundDoublePlay(this.state.boomSound);
        this.props.removeEnemyShot(this.props.id);
        this.props.setShipHitpoints(--this.props.hitpoints);
        if (this.props.hitpoints === 0) {
          this.props.setShipHitpoints(0);
          this.props.setDisplay('shipDisp', false);
          this.props.setGameState('deactivated');
          setTimeout(() => {
            this.props.setDisplay('gameDisp', false);
            this.props.setDisplay('menuDisp', true);
            this.props.setDisplay('mainDisp', true);
          }, 5000)
        }
      }
    }
  }
}

EnemyShot.propTypes = {
  state: PropTypes.string,
  hitpoints: PropTypes.number,
  currentPosition: PropTypes.number,
  setDisplay: PropTypes.func,
  setGameState: PropTypes.func,
  setShipHitpoints: PropTypes.func,
  removeEnemyShot: PropTypes.func
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  }
});

const stateMap = (state) => {
  return {
    state: state.simpleAndroidGame.state,
    hitpoints: state.simpleAndroidGame.hitpoints,
    currentPosition: state.simpleAndroidGame.currentPosition
  };
}

const mapDispatchToProps = {
  setDisplay,
  setGameState,
  setShipHitpoints,
  removeEnemyShot
};

export default connect(stateMap, mapDispatchToProps)(EnemyShot);

AppRegistry.registerComponent('SimpleAndroidGame', () => EnemyShot);