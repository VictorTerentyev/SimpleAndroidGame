import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';

class ErrorMessage extends Component {
  render () {
    const { errorMessage: { errorMessage }, errorMessageDisp: { errorMessageDisp }, dispatch } = this.props;
    return (
      <View style={[setStyles(this.props.errorMessageDisp)]}>
        <Text style={styles.errorName}>Error:</Text>
        <Text style={styles.errorText}>{this.props.errorMessage.text}</Text>
      </View>
    );
  }
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.object,
  errorMessageDisp: PropTypes.string,
  dispatch: PropTypes.func
}

function setStyles(display) {
  const styles = StyleSheet.create({
    errorMessage: {
      display: display,
      marginBottom: 20,
      width: 320
    }
  });
  return styles.errorMessage;
}

const styles = StyleSheet.create({
  errorName: {
    fontFamily: 'Pixel LCD-7',
    fontSize: 18,
    color: '#ffee0a',
    marginBottom: 10
  },
  errorText: {
    fontFamily: 'Pixel LCD-7',
    fontSize: 14,
    color: '#ffee0a',
  }
});

const stateMap = (state) => {
  return {
    errorMessage: state.steamApp.errorMessage,
    errorMessageDisp: state.steamApp.displays.errorMessageDisp
  };
};

export default connect(stateMap)(ErrorMessage);

AppRegistry.registerComponent('RedSteamApp', () => ErrorMessage);