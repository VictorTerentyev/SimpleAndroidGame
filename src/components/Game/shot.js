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

import { removeShot } from '../../actions/AppActions';

class Shot extends PureComponent {
  render() {
    const {

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
        height: '6%'
      }
    });
    return styles.container;
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
    }).start(() => this.props.removeShot(this.props.id));
  }

  checkDamage = (positionX) => {

  }
}

Shot.propTypes = {
  removeShot: PropTypes.func
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  }
});

const stateMap = (state) => {
  return {
    
  };
}

const mapDispatchToProps = {
  removeShot
};

export default connect(stateMap, mapDispatchToProps)(Shot);

AppRegistry.registerComponent('SimpleAndroidGame', () => Shot);