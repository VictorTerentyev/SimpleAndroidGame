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

import {
  setScore,
  setEnemyShipHitpoints,
  removeShot,
  removeEnemyShip,
  removeEnemyShipHitpoints,
  removeEnemyShipCurrentPosition
} from '../../actions/AppActions';

class Shot extends PureComponent {
  render() {
    const {
      score: { score },
      enemyShips: { enemyShips },
      enemyShipsHitpoints: { enemyShipsHitpoints },
      enemyShipsCurrentPositions: { enemyShipsCurrentPositions }
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
      shotWidth: Dimensions.get('window').width * 0.1,
      shotHeight: Dimensions.get('window').height * 0.06,
      shipWidth: Dimensions.get('window').width * 0.1,
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
        top: this.props.positionY,
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
    this.props.enemyShipsCurrentPositions.forEach((e) => {
      //shot and ship cords
      let shotRight = positionX + this.state.shotWidth;
      let shotTop = this.props.positionY;
      let shotBottom = this.props.positionY + this.state.shotHeight;
      let shipLeft = this.state.screenWidth - e.currentPosition;
      let shipRight = this.state.screenWidth - e.currentPosition + this.state.shipWidth;
      let shipTop = 0;
      let shipBottom = 0;
      let id = 0;
      this.props.enemyShips.forEach((elem, index) => { 
        if (elem.id === e.id) {
          id = e.id;
          shipTop = elem.positionY;
          shipBottom = elem.positionY + this.state.shipHeight;
        }
      });
      //check positions
      if (shotRight >= shipLeft && shotRight <= shipRight) {
        if (shotBottom >= shipTop && shotTop <= shipBottom) {
          let hitpoints = 0;
          this.props.enemyShipsHitpoints.forEach((elem) => {
            if (elem.id === e.id) {
              hitpoints = elem.hitpoints;
            }
          });

          this.props.removeShot(this.props.id);
          if (hitpoints > 1) {
            this.props.setScore(this.props.score + 2);
            this.props.setEnemyShipHitpoints(e.id, --hitpoints);
          }
          else {
            this.props.setScore(this.props.score + 5);
            this.props.removeEnemyShip(e.id);
            this.props.removeEnemyShipHitpoints(e.id);
            this.props.removeEnemyShipCurrentPosition(e.id);
          }
        }
      }
    });
  }
}

Shot.propTypes = {
  score: PropTypes.number,
  enemyShips: PropTypes.array,
  enemyShipsHitpoints: PropTypes.array, 
  enemyShipsCurrentPositions: PropTypes.array,
  setScore: PropTypes.func,
  setEnemyShipProp: PropTypes.func,
  removeShot: PropTypes.func,
  removeEnemyShip: PropTypes.func,
  removeEnemyShipHitpoints: PropTypes.func,
  removeEnemyShipCurrentPosition: PropTypes.func
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
    score: state.simpleAndroidGame.score,
    enemyShips: state.simpleAndroidGame.enemyShips,
    enemyShipsHitpoints: state.simpleAndroidGame.enemyShipsHitpoints,
    enemyShipsCurrentPositions: state.simpleAndroidGame.enemyShipsCurrentPositions
  };
}

const mapDispatchToProps = {
  setScore,
  setEnemyShipHitpoints,
  removeShot,
  removeEnemyShip,
  removeEnemyShipHitpoints,
  removeEnemyShipCurrentPosition
};

export default connect(stateMap, mapDispatchToProps)(Shot);

AppRegistry.registerComponent('SimpleAndroidGame', () => Shot);