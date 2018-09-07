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

import { setEnemyShipProp, removeEnemyShip, addEnemyShot } from '../../actions/AppActions';

class EnemyShip extends PureComponent {
  render() {
    const {
      state: { state },
      enemyShips: { enemyShips },
      enemyShots: { enemyShots },
      componentDidMount,
      componentWillReceiveProps,
      componentWillUnmount
    } = this.props;
    
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

  constructor(props) {
    super(props);
    this.state = {
      exist: true,
      random: Math.random() * (10000 - 9000) + 200,
      loopState: 'deactivated',
      positionXMiddle: Dimensions.get('window').width * 0.9 * 0.07,
      positionYMiddle: Dimensions.get('window').height * 0.9 * 0.07,
      anim: new Animated.Value(this.props.positionX)
    };
    this.state.anim.addListener(({value}) => {
      let ship = {
        id: this.props.id,
        hitpoints: this.props.hitpoints,
        positionY: this.props.positionY,
        positionX: this.props.positionX,
        currentPosition: this.props.currentPosition
      }
      this.positionX = value;
      this.props.setEnemyShipProp(ship, 'currentPosition', this.positionX);
    });
  }

  componentDidMount = () => {
    this.setEnemyShipAnimation();
    if (this.state.loopState !== 'active') {
      this.createEnemyShotLoop();
      this.setState({loopState: 'active'});
    }
  }

  componentWillReceiveProps = (nextProps) => {
    
  }

  componentWillUnmount = () => {
    clearTimeout(this.timerHandle);
    AppState.removeListener(this.positionX);
  }

  createEnemyShotLoop = (value) => {
    this.setState({random: value || Math.random() * (10000 - 9000) + 500});
    this.timerHandle = setTimeout(this.createEnemyShot.bind(this), this.state.random);
  }

  createEnemyShot = () => {
    let random = Math.random() * (10000 - 9000) + 500;
    if (['active', 'resumed'].includes(this.props.state) && this.state.exist === true) {
      this.props.addEnemyShot({ 
        id: Date.now(),
        positionY: this.props.positionY + this.state.positionYMiddle,
        positionX: this.positionX + this.state.positionXMiddle
      });
      this.createEnemyShotLoop(random);
    } else {
      this.setState({loopState: 'deactivated'});
      return;
    }
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: this.props.positionY,
        width: '10%',
        height: '20%',
        zIndex: -1
      }
    });
    return styles.container;
  }

  setEnemyShipAnimation = () => {
    const position = Dimensions.get('window').width + 200;
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
    }).start(() => {this.props.removeEnemyShip(this.props.id)});
  }
}

EnemyShip.propTypes = {
  state: PropTypes.string,
  enemyShips: PropTypes.array,
  enemyShots: PropTypes.array,
  setEnemyShipProp: PropTypes.func,
  removeEnemyShip: PropTypes.func,
  addEnemyShot: PropTypes.func,
  componentDidMount: PropTypes.func,
  componentWillReceiveProps: PropTypes.func
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
    enemyShips: state.simpleAndroidGame.enemyShips,
    enemyShots: state.simpleAndroidGame.enemyShots
  };
};

const mapDispatchToProps = {
  setEnemyShipProp,
  removeEnemyShip,
  addEnemyShot
};

export default connect(stateMap, mapDispatchToProps)(EnemyShip);

AppRegistry.registerComponent('SimpleAndroidGame', () => EnemyShip);