import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Animated,
  Easing
} from 'react-native';

class Ship extends PureComponent {
  render() {
    const { 
      game: { display },
      dispatch,
      componentWillReceiveProps
    } = this.props;
    return (
      <Animated.View
        style={[
          this.setDisplay(),
          {
            top: this.state.anim
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
    this.state = {
      display: 'flex',
      anim: new Animated.Value(this.props.position)
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setBgAnimation(nextProps.position);
  }

  setShipBg = () => {
    if (this.props.id === 0) {
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
        width: '10%',
        height: '20%',
        zIndex: -1
      }
    });
    return styles.container;
  }

  setBgAnimation = (position) => {
    let duration = position > this.props.position ? (position - this.props.position) * 5 : (this.props.position - position) * 5;
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
}

Ship.propTypes = {
  game: PropTypes.object,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  }
});

const stateMap = (state) => {
  return {
    game: state.simpleAndroidGame.game
  };
};

export default connect(stateMap)(Ship);

AppRegistry.registerComponent('SimpleAndroidGame', () => Ship);