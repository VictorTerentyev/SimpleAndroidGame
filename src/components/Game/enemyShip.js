import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Animated,
  Easing,
  Dimensions,
  AppState
} from 'react-native';

import EnemyShot from './enemyShot';

import {
  setEnemyShipCurrentPosition,
  removeEnemyShip,
  removeEnemyShipHitpoints,
  removeEnemyShipCurrentPosition,
  addEnemyShot
} from '../../actions/AppActions';

class EnemyShip extends PureComponent {
  render() {
    const {
      state: { state }
    } = this.props;

    this.state = {
      exist: true,
      random: Math.random() * (10000 - 9000) + 200,
      loopState: 'deactivated',
      screenWidth: Dimensions.get('window').width,
      positionXMiddle: Dimensions.get('window').width * 0.9 * 0.07,
      positionYMiddle: Dimensions.get('window').height * 0.9 * 0.07,
      anim: new Animated.Value(this.props.positionX)
    };
    
    return (
      <Animated.View
        ref={(ref) => { this.ship = ref }}
        style={[
          this.setDisplay(),
          {
            right: this.state.anim
          }
        ]}
        renderToHardwareTextureAndroid
      >
        <Image
          style={styles.image}
          source={{uri: 'eagle'}}
          resizeMode="stretch"
        />
      </Animated.View>
    );
  }

  constructor() {
    this.positionX = 0;
  }

  componentWillMount = () => {
    this.setListener();
    this.setEnemyShipAnimation();
    if (!this.timerHandle) {
      this.createEnemyShotLoop();
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.state === 'deactivated') {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    };
    if (nextProps.state === 'paused') {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
      this.setState({
        anim: new Animated.Value(this.positionX),
      });
      AppState.removeListener(this.positionX);
    };
    if (nextProps.state === 'resumed') {
      this.setListener();
      this.setEnemyShipAnimation();
      if (!this.timerHandle) {
        this.createEnemyShotLoop();
      };
    };
  }

  componentWillUnmount = () => {
    clearTimeout(this.timerHandle);
    AppState.removeListener(this.state.anim);
  }

  setListener = () => {
    this.state.anim.addListener(({value}) => {
      this.positionX = value;
      this.props.setEnemyShipCurrentPosition(this.props.id, value);
    });
  }

  createEnemyShotLoop = (value) => {
    this.setState({random: value || Math.random() * (10000 - 9000) + 500});
    this.timerHandle = setTimeout(this.createEnemyShot.bind(this), this.state.random);
  }

  createEnemyShot = () => {
    if (['active', 'resumed'].includes(this.props.state)) {
      let random = Math.random() * (10000 - 9000) + 500;
      this.props.addEnemyShot({
        id: Date.now(),
        positionY: this.props.positionY + this.state.positionYMiddle,
        positionX: this.positionX + this.state.positionXMiddle
      });
      this.createEnemyShotLoop(random);
    };
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: this.props.positionY,
        width: '10%',
        height: '20%'
      }
    });
    return styles.container;
  }

  setEnemyShipAnimation = () => {
    const position = this.state.screenWidth + 200 + this.positionX;
    Animated.parallel([
      Animated.timing(
        this.state.anim,
        {
          toValue: position,
          duration: 3000,
          easing: Easing.linear,
        }
      )
    ],
    {
      useNativeDriver: true
    }).start(() => {
      if (this.positionX > this.state.screenWidth) {
        this.props.removeEnemyShipHitpoints(this.props.id);
        this.props.removeEnemyShipCurrentPosition(this.props.id);
        this.props.removeEnemyShip(this.props.id);
      };
    });
  }
}

EnemyShip.propTypes = {
  state: PropTypes.string,
  setEnemyShipCurrentPosition: PropTypes.func,
  removeEnemyShip: PropTypes.func,
  removeEnemyShipHitpoints: PropTypes.func,
  removeEnemyShipCurrentPosition: PropTypes.func,
  addEnemyShot: PropTypes.func
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  }
});

const stateMap = (state) => {
  return {
    state: state.simpleAndroidGame.state
  };
};

const mapDispatchToProps = {
  setEnemyShipCurrentPosition,
  removeEnemyShip,
  removeEnemyShipHitpoints,
  removeEnemyShipCurrentPosition,
  addEnemyShot
};

export default connect(stateMap, mapDispatchToProps)(EnemyShip);

AppRegistry.registerComponent('SimpleAndroidGame', () => EnemyShip);