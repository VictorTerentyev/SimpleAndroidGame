import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions,
  AppState
} from 'react-native';

import * as AppActions from '../../actions/AppActions';

class Credits extends Component {
  render() {
    const { appProps: { appProps }, creditsDisp: { creditsDisp }, dispatch } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={setStyles(this.props.creditsDisp)}>
        <View style={styles.container}>
          <Text style={styles.header}>Developer:</Text>
          <Text style={styles.text}>Victor Terentyev</Text>
          <TouchableHighlight style={styles.button} underlayColor="#ffa200e6" onPress={this.actionHandle('Exit')}> 
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {

    }
  }
}

function setStyles(display) {
  const styles = StyleSheet.create({
    container: {
      display: display
    }
  });
  return styles.container;
}

Credits.propTypes = {
  appProps: PropTypes.object,
  creditsDisp: PropTypes.string,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  bgContainer: {

  },
  container: {

  },
  header: {

  },
  text: {

  },
  button: {

  },
  buttonText: {

  }
});

const stateMap = (state) => {
  return {
    appState: state.simpleAndroidGame,
    creditsDisp: state.simpleAndroidGame.displays.menu.credits
  };
};

export default connect(stateMap)(Credits);

AppRegistry.registerComponent('SimpleAndroidGame', () => Credits);