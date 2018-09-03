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

class EnemyShot extends PureComponent {
  render() {
    const { dispatch } = this.props;

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
          source={this.setBgSource()}
          resizeMode="cover"
        />
      </Animated.View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      display: 'flex',
      source: {uri: 'red_shot'},
      shotPosAnim: new Animated.Value(this.props.positionX),
      shotBgAnim: new Animated.Value(0)
    };
    this.setBgAnimation();
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: this.props.positionY,
        left: this.props.positionX,
        width: '10%',
        height: '6%',
        zIndex: 0
      }
    });
    return styles.container;
  }

  setBgAnimation = () => {
    let value = Dimensions.get('window').width + 200 + this.props.positionX;
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
    }).start();
    setTimeout(() => {
      this.props.removeEnemyShot(this.props.id);
    }, 2500);
  }
}

EnemyShot.propTypes = {
  removeEnemyShot: PropTypes.func,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  image: {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
});

const stateMap = (state) => {
  return {

  };
};

export default connect(stateMap)(EnemyShot);

AppRegistry.registerComponent('SimpleAndroidGame', () => EnemyShot);