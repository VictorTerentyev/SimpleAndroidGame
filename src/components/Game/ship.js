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

class Ship extends PureComponent {
  render() {
    const {
      ships: { ships },
      shots: { shots },
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
            [this.state.position]: this.state.anim
          }
        ]}
        renderToHardwareTextureAndroid
      >
        <Image
          style={styles.image}
          source={this.setShipBg()}
          resizeMode="stretch"
        />
      </Animated.View>
    );
  }

  constructor(props) {
    super(props);
    const position = this.props.side === 'left' ? 'top' : 'right';
    this.state = {
      measurements: {},
      position: position,
      anim: new Animated.Value(this.props.position)
    };
  }

  componentDidMount = () => {
    if (this.props.side === 'right') {
      let context = this;
      let random = Math.random() * (10000 - 7000) + 500;
      (function loop() {
          let random = Math.random() * (10000 - 7000) + 500;
          setTimeout(function() {
          if (context.props.state === 'active' || context.props.state === 'resumed') {
            context.measure();
            let middle = Dimensions.get('window').height * 0.9 * 0.07;
            let obj = { 
              id: context.props.shots.length,
              positionY: context.props.ships[context.props.id].positionY + middle,
              positionX: context.state.measurements.fx, 
              side: 'right'
            };
            context.props.addShot(obj);
          }
        }, random);
      }());
      this.setEnemyShipAnimation();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.side === 'left') {
      this.setBgAnimation(nextProps.position);
      alert(this.props.positionX);
    }
  }

  measure = () => {
    UIManager.measure(findNodeHandle(this.ship), (x, y, width, height, fx, fy) => 
      this.setState({measurements: { x, y, width, height, fx, fy }})
    )
  }

  setShipBg = () => {
    if (this.props.side === 'left') {
      return {uri: 'cobra'};
    } 
    else {
      return {uri: 'eagle'}
    }
  }

  setDisplay = () => {

    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: this.props.position,
        [this.props.side]: 0, 
        width: '10%',
        height: '20%',
        zIndex: -1
      }
    });
    return styles.container;
  }

  setBgAnimation = (position) => {
    const duration = position > this.props.position ? (position - this.props.position) * 5 : (this.props.position - position) * 5;
    Animated.parallel([
      Animated.timing(
        this.state.anim,
        {
          toValue: position,
          duration: duration,
          easing: Easing.ease,
        }
      )
    ],
    {
      useNativeDriver: true
    }).start();
  }

  setEnemyShipAnimation = () => {
    const position = Dimensions.get('window').width + 200;
    Animated.parallel([
      Animated.timing(
        this.state.anim,
        {
          toValue: position,
          duration: 1000,
          easing: Easing.linear,
        }
      )
    ],
    {
      useNativeDriver: true
    }).start();
    setTimeout(() => {
      this.props.removeShip(this.props.id);
    }, 3000) 
  }
}

Ship.propTypes = {
  id: PropTypes.number,
  health: PropTypes.number,
  position: PropTypes.number,
  side: PropTypes.string,
  ships: PropTypes.array,
  shots: PropTypes.array,
  removeShip: PropTypes.func,
  addShot: PropTypes.func,
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
    ships: state.simpleAndroidGame.ships,
    shots: state.simpleAndroidGame.shots
  };
};

export default connect(stateMap)(Ship);

AppRegistry.registerComponent('SimpleAndroidGame', () => Ship);