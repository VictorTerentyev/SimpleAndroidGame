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
  Dimensions,
  AppState
} from 'react-native';

import { setCurrentShipPosition } from '../../actions/AppActions';

class Ship extends PureComponent {
  render() {
    const {
      display: { display },
      hitpoints: { hitpoints },
      position: { position },
      componentWillReceiveProps,
      componentWillUnmount
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
    this.state.anim.addListener(({value}) => {
      this.props.setCurrentShipPosition(value);
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.hitpoints !== 0) {
      this.setBgAnimation(nextProps.position);
    }
  }

  componentWillUnmount = () => {
    AppState.removeListener(this.state.anim);
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        display: this.props.display,
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
  display: PropTypes.string,
  hitpoints: PropTypes.number,
  position: PropTypes.number,
  setCurrentShipPosition: PropTypes.func,
  componentWillReceiveProps: PropTypes.func,
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
    display: state.simpleAndroidGame.shipDisp,
    hitpoints: state.simpleAndroidGame.hitpoints,
    position: state.simpleAndroidGame.position
  };
};

const mapDispatchToProps = {
  setCurrentShipPosition
};

export default connect(stateMap, mapDispatchToProps)(Ship);

AppRegistry.registerComponent('SimpleAndroidGame', () => Ship);