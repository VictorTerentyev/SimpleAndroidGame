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

import { setDisplay, setShipHitpoints, removeEnemyShot } from '../../actions/AppActions';

class EnemyShot extends PureComponent {
  render() {
    const {
      hitpoints: { hitpoints },
      currentShipPosition: { currentShipPosition },
      componentWillUnmount
    } = this.props;

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

  constructor(props) {
    super(props);
    this.state = {
      display: 'flex',
      screenWidth: Dimensions.get('window').width,
      shipWidth: Dimensions.get('window').width * 0.9,
      shipBottom: this.props.currentShipPosition + Dimensions.get('window').height * 0.2,
      shotPosAnim: new Animated.Value(this.props.positionX),
      shotBgAnim: new Animated.Value(0)
    };
    this.setBgAnimation();
    this.state.shotPosAnim.addListener(({value}) => {
      this.checkDamage(value);
    });
  }

  componentWillUnmount = () => {

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
    let value = this.state.screenWidth + 200 + this.props.positionX;
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
    }).start(() => this.props.removeEnemyShot(this.props.id));
  }

  checkDamage = (positionX) => {
    //shot and ship cords
      let shotLeft = positionX;
      let shotTop = this.props.positionY;
      let shipRight = this.state.shipWidth;
      let shipLeft = this.state.screenWidth;
      let shipTop = this.props.currentShipPosition;
      let shipBottom = this.state.shipBottom;
    //check positions
    if (shotLeft >= shipRight && shotLeft <= shipLeft) {
      if (shotTop >= shipTop && shotTop <= shipBottom) {
        this.props.removeEnemyShot(this.props.id);
        if (this.props.hitpoints > 1) {
          this.props.setShipHitpoints(this.props.hitpoints - 1);
        }
        else {
          this.props.setDisplay('shipDisp', 'none');
          this.props.setShipHitpoints(0);
        }
      }
    }
  }
}

EnemyShot.propTypes = {
  hitpoints: PropTypes.number,
  currentShipPosition: PropTypes.number,
  setDisplay: PropTypes.func,
  setShipHitpoints: PropTypes.func,
  removeEnemyShot: PropTypes.func,
  componentWillUnmount: PropTypes.func
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  }
});

const stateMap = (state) => {
  return {
    hitpoints: state.simpleAndroidGame.hitpoints,
    currentShipPosition: state.simpleAndroidGame.currentShipPosition
  };
}

const mapDispatchToProps = {
  setDisplay,
  setShipHitpoints,
  removeEnemyShot
};

export default connect(stateMap, mapDispatchToProps)(EnemyShot);

AppRegistry.registerComponent('SimpleAndroidGame', () => EnemyShot);