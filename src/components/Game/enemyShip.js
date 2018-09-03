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
  UIManager,
  findNodeHandle
} from 'react-native';

class EnemyShip extends PureComponent {
  render() {
    const {
      enemyShips: { enemyShips },
      enemyShots: { enemyShots },
      dispatch,
      componentDidMount,
      componentWillReceiveProps
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
      measurements: {},
      anim: new Animated.Value(this.props.positionX)
    };
  }

  componentDidMount = () => {
    this.setEnemyShipAnimation();
    this.addEnemyShotLoop();
  }

  componentWillReceiveProps = (nextProps) => {
    
  }

  addEnemyShotLoop = () => {
    let context = this;
    let random = Math.random() * (10000 - 7000) + 500;
    (function loop() {
        let random = Math.random() * (10000 - 7000) + 500;
        setTimeout(function() {
        if (context.props.state === 'active' || context.props.state === 'resumed') {
          context.measure();
          let middle = Dimensions.get('window').height * 0.9 * 0.07;
          let obj = { 
            id: context.props.enemyShots.length,
            positionY: context.props.enemyShips[context.props.id].positionY + middle,
            positionX: context.state.measurements.fx
          };
          context.props.addEnemyShot(obj);
        }
      }, random);
    }());
  }

  measure = () => {
    UIManager.measure(findNodeHandle(this.ship), (x, y, width, height, fx, fy) => 
      this.setState({measurements: { x, y, width, height, fx, fy }})
    )
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
          duration: 2000,
          easing: Easing.linear,
        }
      )
    ],
    {
      useNativeDriver: true
    }).start();
    setTimeout(() => {
      this.props.removeEnemyShip(this.props.id);
    }, 3000) 
  }
}

EnemyShip.propTypes = {
  enemyShips: PropTypes.array,
  enemyShots: PropTypes.array,
  removeEnemyShip: PropTypes.func,
  addEnemyShot: PropTypes.func,
  dispatch: PropTypes.func,
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
    enemyShips: state.simpleAndroidGame.enemyShips,
    enemyShots: state.simpleAndroidGame.enemyShots
  };
};

export default connect(stateMap)(EnemyShip);

AppRegistry.registerComponent('SimpleAndroidGame', () => EnemyShip);