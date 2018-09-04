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

import { setPosition, addShot } from '../../actions/AppActions';

class Controller extends PureComponent {
  render() {
    const {
      position: { position },
      shots: { shots },
      dispatch
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight 
          style={styles.moveController}
          underlayColor="transparent"
          onPressIn={(event) => this.actionHandle('move', event)} 
        >
          <View style={styles.moveController}/>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.shootController}
          underlayColor="transparent"
          onPressIn={() => this.actionHandle('shoot')} 
        >
          <View style={styles.shootController}/>
        </TouchableHighlight>
      </View>
    );
  }

  actionHandle = (action, event) => {
    switch (action) {
      case 'move':
        let positionY = event.nativeEvent.locationY - Dimensions.get('window').height * 0.9 * 0.1;
        this.props.setPosition(positionY);
        break;
      case 'shoot':
        let middle = Dimensions.get('window').height * 0.9 * 0.07;
        let obj = { 
          id: this.props.shots.length,
          position: this.props.position + middle,
        };
        this.props.addShot(obj);
        break;
    }
  }
}

Controller.propTypes = {
  position: PropTypes.number,
  shots: PropTypes.array,
  setPosition: PropTypes.func,
  addShot: PropTypes.func,
  dispatch: PropTypes.func
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
    position: state.simpleAndroidGame.position,
    shots: state.simpleAndroidGame.shots
  };
};

const mapDispatchToProps = {
  setPosition,
  addShot
};

export default connect(stateMap, mapDispatchToProps)(Controller);

AppRegistry.registerComponent('SimpleAndroidGame', () => Controller);