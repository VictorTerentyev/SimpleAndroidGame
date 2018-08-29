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

class Shot extends PureComponent {
  render() {
    const { game: { display }, dispatch } = this.props;

    return (
      <Animated.View
        style={[
          this.setDisplay(),
          {
            [this.props.side]: this.state.shotPosAnim
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
      source: {uri: 'blue_shot'},
      shotPosAnim: new Animated.Value(0),
      shotBgAnim: new Animated.Value(0)
    };
    this.setBgAnimation();
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: this.props.position,
        width: '10%',
        height: '6%',
        zIndex: -2
      }
    });
    return styles.container;
  }

  setBgSource = () => {
    return this.props.side = 'left' ? {uri: 'blue_shot'} : {uri: 'red_shot'};
  }

  setBgAnimation = () => {
    let value = Dimensions.get('window').width + 200;
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
  }
}

Shot.propTypes = {
  game: PropTypes.object,
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
    game: state.simpleAndroidGame.game
  };
};

export default connect(stateMap)(Shot);

AppRegistry.registerComponent('SimpleAndroidGame', () => Shot);