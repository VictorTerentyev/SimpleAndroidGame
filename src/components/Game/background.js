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
  AppState
} from 'react-native';

class GameBackground extends PureComponent {
  render() {
    const {
      state: { state },
      brightness: { brightness },
      display: { display }
    } = this.props;

    this.state = {
      state: this.props.state,
      appState: AppState.currentState, 
      anim: new Animated.Value(0),
    };

    return (
      <View style={styles.container}>
        <Animated.Image 
          style={[
            styles.image,
            { 
              left: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '1%'],
              })
            }
          ]}
          resizeMode="stretch"
          source={{uri: 'staticbg'}}
        />
        <View style={this.setBrightness()}/>
      </View>
    );
  }

  componentWillMount = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.display === true) {
      this.setBgAnimation();
    } else { 
      Animated.timing(
        this.state.anim
      ).stop();
    };
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(this.state.appState) && nextAppState === 'active') {
      this.setBgAnimation();
    } else {
      Animated.timing(
        this.state.anim
      ).stop();
    }
    this.setState({appState: nextAppState});
  }

  setBgAnimation = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(
          this.state.anim,
          {
            toValue: -900,
            duration: 1000,
            easing: Easing.linear,
          }
        )
      ],
      {
        useNativeDriver: true
      })
    ).start();
  }

  setBrightness = () => {
    let styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 1 - this.props.brightness
      }
    });
    return styles.container;
  }
}

GameBackground.propTypes = {
  state: PropTypes.string,
  display: PropTypes.bool
  brightness: PropTypes.number,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0 
  },
  image: {
    position: 'absolute',
    width: '1000%',
    height: '100%'
  }
});

const stateMap = (state) => {
  return {
    state: state.simpleAndroidGame.state,
    display: state.simpleAndroidGame.gameDisp,
    brightness: state.simpleAndroidGame.Brightness
  };
};

export default connect(stateMap)(GameBackground);

AppRegistry.registerComponent('SimpleAndroidGame', () => GameBackground);