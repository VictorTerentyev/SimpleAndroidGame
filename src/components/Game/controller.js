import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import {
  setControllerState,
  setPosition,
  addShot
} from '../../actions/AppActions';

class Controller extends PureComponent {
  render() {
    const {
      hitpoints: { hitpoints },
      position: { position },
      currentPosition: { currentPosition },
      shots: { shots },
      controllerState: { controllerState }
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight 
          disabled={this.props.controllerState}
          style={styles.moveController}
          underlayColor="transparent"
          onPress={(event) => this.setPositionHandle(event)} 
        >
          <View style={styles.moveController}/>
        </TouchableHighlight>
        <TouchableHighlight 
          disabled={this.props.controllerState} 
          style={styles.shootController}
          underlayColor="transparent"
          onPressIn={() => {
            this.addShotLoop(0);
          }}
          onPressOut={() => this.clearTimer()} 
        >
          <View style={styles.shootController}/>
        </TouchableHighlight>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      disabled: false,
      shootFlag: false,
      shipYMiddle: Dimensions.get('window').height * 0.9 * 0.07
    };    
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.hitpoints === 0) {
      this.props.setControllerState(true);
      this.clearTimer();
    }
  }

  clearTimer = () => {
    clearTimeout(this.timerHandle);
    this.timerHandle = 0;
  }

  setPositionHandle = (event) => {
    let positionY = event.nativeEvent.locationY - Dimensions.get('window').height * 0.9 * 0.1;
    this.props.setPosition(positionY);
    this.setState({movePosition: positionY});
  }

  addShotLoop = (value) => {
    this.timerHandle = setTimeout(this.addShot.bind(this), value);
  }

  addShot = () => {
    let obj = {
      id: Date.now(),
      positionY: this.props.currentPosition + this.state.shipYMiddle,
    };
    this.props.addShot(obj);
    this.addShotLoop(400);
  }
}

Controller.propTypes = {
  hitpoints: PropTypes.number,
  position: PropTypes.number,
  currentPosition: PropTypes.number,
  shots: PropTypes.array,
  controllerState: PropTypes.bool,
  setControllerState: PropTypes.func,
  setPosition: PropTypes.func,
  addShot: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: '10%',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row'  
  },
  moveController: {
    width: '10%',
    height: '100%'
  },
  shootController: {
    width: '90%',
    height: '100%'
  }
});

const stateMap = (state) => {
  return {
    hitpoints: state.simpleAndroidGame.hitpoints,
    position: state.simpleAndroidGame.position,
    currentPosition: state.simpleAndroidGame.currentPosition,
    shots: state.simpleAndroidGame.shots,
    controllerState: state.simpleAndroidGame.controllerState
  };
};

const mapDispatchToProps = {
  setControllerState,
  setPosition,
  addShot
};

export default connect(stateMap, mapDispatchToProps)(Controller);

AppRegistry.registerComponent('SimpleAndroidGame', () => Controller);