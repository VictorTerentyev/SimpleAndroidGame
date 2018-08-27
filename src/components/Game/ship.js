import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';

import Shot from './shot';

import YourShipBg from '../../../assets/images/cobra.png';
import EnemyShipBg from '../../../assets/images/eagle.png';

class Ship extends Component {
  render() {
    const { game: { display }, dispatch } = this.props;
    return (
      <View style={this.setDisplay()}>
        <Image style={styles.image} source={this.setShipBg()} resizeMode="contain"/>
        {Object.values(this.props.game.ships).map((e, index) => {
          return (
            <Shot key={index} position={e.position}/> 
          );
        })}
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      display: 'flex',
    };
  }

  setShipBg = () => {
    if (this.props.id === 0) {
      return YourShipBg;
    } 
    else {
      return EnemyShipBg;
    }
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'relative',
        top: this.props.position,  
        width: '20%',
        height: '10%'
      }
    });
    return styles.container;
  }
}

Ship.propTypes = {
  game: PropTypes.object,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 40
  }
});

const stateMap = (state) => {
  return {
    game: state.simpleAndroidGame.game
  };
};

export default connect(stateMap)(Ship);

AppRegistry.registerComponent('SimpleAndroidGame', () => Ship);