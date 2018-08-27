import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';

import Shots from '../../../assets/images/shots.png';

class Shot extends Component {
  render() {
    const { game: { display }, dispatch } = this.props;

    return (
      <View style={this.setDisplay()}>
        <Image style={styles.image} source={Shots} resizeMode="contain"/>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      display: 'flex' 
    };
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        position: 'relative',
        top: 50,  
        width: '5%',
        height: '5%'
      }
    });
    return styles.container;
  }
}

Shot.propTypes = {
  game: PropTypes.object,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  image: {
    width: '5%',
    height: '5%'
  }
});

const stateMap = (state) => {
  return {
    game: state.simpleAndroidGame.game
  };
};

export default connect(stateMap)(Shot);

AppRegistry.registerComponent('SimpleAndroidGame', () => Shot);