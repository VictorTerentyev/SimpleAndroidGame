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

import Shots from '../../../assets/images/shots.png';

class Shot extends PureComponent {
  render() {
    const { game: { display }, dispatch } = this.props;

    return (
      <Animated.View
        style={[
          this.setDisplay(),
          {
            [this.props.side]: this.state.anim
          }
        ]}
      >
        <Image
          style={styles.image}
          source={this.state.source}
          resizeMode="cover"
        />
      </Animated.View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      display: 'flex',
      source: {uri: 'shots'},
      anim: new Animated.Value(0)
    };
    this.setBgAnimation();
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: this.props.position,
        width: '20%',
        height: '20%',
        zIndex: -1
      }
    });
    return styles.container;
  }

  setBgAnimation = () => {
    let value = Dimensions.get('window').width + 200;
    Animated.parallel([
      Animated.timing(
        this.state.anim,
        {
          toValue: value,
          duration: 2000,
          easing: Easing.ease,
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