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
  Dimensions
} from 'react-native';

class Ship extends PureComponent {
  render() {
    const {
      hitpoints: { hitpoints },
      position: { position },
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
          source={{uri: 'cobra'}}
          resizeMode="stretch"
        />
      </Animated.View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(this.props.position),
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setBgAnimation(nextProps.position);
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: this.props.position,
        left: 0, 
        width: '10%',
        height: '20%',
        zIndex: 0
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
}

Ship.propTypes = {
  hitpoints: PropTypes.number,
  position: PropTypes.number,
  dispatch: PropTypes.func,
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
    hitpoints: state.simpleAndroidGame.hitpoints,
    position: state.simpleAndroidGame.position
  };
};

export default connect(stateMap)(Ship);

AppRegistry.registerComponent('SimpleAndroidGame', () => Ship);