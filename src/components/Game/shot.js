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
  Easing
} from 'react-native';

import { removeShot, setEnemyShipProp, removeEnemyShip } from '../../actions/AppActions';

class Shot extends PureComponent {
  render() {
    const {
      enemyShips: { enemyShips }
    } = this.props

    return (
      <Animated.View
        style={[
          this.setDisplay(),
          {
            left: this.state.shotPosAnim
          }
        ]}
      >
        <Animated.Image
          style={[
            styles.image,
            {transform: [{translateX: this.state.shotBgAnim}]}
          ]}
          source={{uri: 'blue_shot'}}
          resizeMode="cover"
        />
      </Animated.View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      display: 'flex',
      screenWidth: Dimensions.get('window').width,
      shotWidth: Dimensions.get('window').width * 0.9,
      shipWidth: Dimensions.get('window').width * 0.9,
      shipHeight: Dimensions.get('window').height * 0.2,
      shotPosAnim: new Animated.Value(0),
      shotBgAnim: new Animated.Value(0)
    };
    this.setBgAnimation();
    this.state.shotPosAnim.addListener(({value}) => {
      this.checkDamage(value);
    });
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: this.props.position,
        width: '10%',
        height: '6%'
      }
    });
    return styles.container;
  }

  setBgAnimation = () => {
    let value = this.state.screenWidth + 200;
    Animated.parallel([
      Animated.timing(
        this.state.shotPosAnim,
        {
          toValue: value,
          duration: 2000,
          easing: Easing.ease,
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
    }).start(() => this.props.removeShot(this.props.id));
  }

  checkDamage = (positionX) => {
    this.props.enemyShips.forEach((e) => {
      //shot and ship cords
      let shotRight = this.state.screenWidth - positionX + this.state.shotWidth;
      let shotTop = this.props.positionY;
      let shipLeft = e.currentPosition;
      let shipRight = e.currentPosition + this.state.shipWidth;
      let shipTop = e.positionY;
      let shipBottom = e.positionY + this.state.shipHeight;
      //check positions
      if ( shotRight >= shipLeft && shotRight <= shipRight) {
        if (shotTop >= shipTop && shotTop <= shipBottom) {
          this.props.removeShot(this.props.id);
          if (e.hitpoints > 0) {
            this.props.setEnemyShipProp(e, 'hitpoints', e.hitpoints--);
          }
          else {
            this.props.removeEnemyShip(e.id);
          }
        }
      }
    });
  }
}

Shot.propTypes = {
  enemyShips: PropTypes.array,
  removeShot: PropTypes.func,
  setEnemyShipProp: PropTypes.func,
  removeEnemyShip: PropTypes.func
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  }
});

const stateMap = (state) => {
  return {
    enemyShips: state.simpleAndroidGame.enemyShips
  };
}

const mapDispatchToProps = {
  removeShot,
  setEnemyShipProp,
  removeEnemyShip
};

export default connect(stateMap, mapDispatchToProps)(Shot);

AppRegistry.registerComponent('SimpleAndroidGame', () => Shot);