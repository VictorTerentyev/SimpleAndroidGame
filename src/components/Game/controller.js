import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native';

class Controller extends Component {
  render() {
    const { game: { game }, dispatch } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight 
          style={styles.moveController}
          underlayColor="transparent"
          onPressIn={() => this.actionHandle('move')} 
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

  constructor() {
    super();
  }

  actionHandle = (action) => {
    switch (action) {
      case 'move':
        this.props.setPosition();
        break;
      case 'shoot':
        let obj = { position: this.props.game.ships[0].position };
        this.props.addShot(0, obj);
        break;
    }
  }
}

Controller.propTypes = {
  game: PropTypes.object,
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
    width: '20%',
    height: '100%'
  },
  shootController: {
    width: '80%',
    height: '100%'
  }
});

const stateMap = (state) => {
  return {
    game: state.simpleAndroidGame.game
  };
};

export default connect(stateMap)(Controller);

AppRegistry.registerComponent('SimpleAndroidGame', () => Controller);