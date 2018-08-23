import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';

class Ship extends Component {
  render() {
    const { game: { display }, dispatch } = this.props;

    return (
      <View style={this.setDisplay()}>

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
        display: this.state.display,
        width: 60,
        height: 40
      }
    });
    return styles.container;
  }
}

Intro.propTypes = {
  game: PropTypes.object,
  dispatch: PropTypes.func
}

const stateMap = (state) => {
  return {
    game: state.simpleAndroidGame.game
  };
};

export default connect(stateMap)(Ship);

AppRegistry.registerComponent('SimpleAndroidGame', () => Ship);