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

import { setShipCurrentPosition } from '../../actions/AppActions';

class Ship extends PureComponent {
  render() {
    const {
      display: { display },
      hitpoints: { hitpoints },
      position: { position }
    } = this.props;

    this.state = {
      display: 'flex',
      displayFlag: false,
      shipHeight: '100%',
      shipWidth: '100%',
      visibilityFlag: true,
      anim: new Animated.Value(this.props.position),
    };

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
          style={this.setImageDisplay()}
          source={{uri: 'cobra'}}
          resizeMode="stretch"
        />
      </Animated.View>
    );
  }

  componentWillMount = () => {
    this.setListener();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.display === true && this.state.displayFlag === true) {
      this.setDisplayState('flex', false);
    };
    if (nextProps.display === false && this.state.displayFlag === false) {
      this.setDisplayState('none', true);
    };
    if (nextProps.hitpoints !== 0) {
      this.setBgAnimation(nextProps.position);
      if (this.state.visibilityFlag === false) {
        this.setState({
          shipHeight: 100 + '%',
          shipWidth: 100 + '%',
          visibilityFlag: true
        });
      };
    }
    else {
      this.setState({
        shipHeight: 0 + '%',
        shipWidth: 0 + '%',
        visibilityFlag: false
      });
    };
  }

  componentWillUnmount = () => {
    AppState.removeListener(this.state.anim);
  }

  setListener = () => {
    this.state.anim.addListener(({value}) => {
      this.props.setShipCurrentPosition(value);
    });
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        display: this.state.display,
        position: 'absolute',
        width: '10%',
        height: '20%',
        top: this.props.position,
        left: 0
      }
    });
    return styles.container;
  }

  setDisplayState = (display, flag) => {
    this.setState({
      display: display,
      displayFlag: flag
    });
  }

  setImageDisplay = () => {
    const styles = StyleSheet.create({
      image: {
        width: this.state.shipHeight,
        height: this.state.shipWidth
      }
    });
    return styles.image;
  }

  setBgAnimation = (position) => {
    const duration = position > this.props.position ? (position - this.props.position) * 5 : (this.props.position - position) * 5;
    Animated.parallel([
      Animated.timing(
        this.state.anim,
        {
          toValue: position,
          duration: duration,
          easing: Easing.linear,
        }
      )
    ],
    {
      useNativeDriver: true
    }).start();
  }
}

Ship.propTypes = {
  display: PropTypes.bool,
  hitpoints: PropTypes.number,
  position: PropTypes.number,
  setShipCurrentPosition: PropTypes.func
}

const stateMap = (state) => {
  return {
    display: state.simpleAndroidGame.shipDisp,
    hitpoints: state.simpleAndroidGame.hitpoints,
    position: state.simpleAndroidGame.position
  };
};

const mapDispatchToProps = {
  setShipCurrentPosition
};

export default connect(stateMap, mapDispatchToProps)(Ship);

AppRegistry.registerComponent('SimpleAndroidGame', () => Ship);