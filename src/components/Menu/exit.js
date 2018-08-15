import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  AppState
} from 'react-native';

import * as AppActions from '../../actions/AppActions';

class Exit extends Component {
  render() {
    const { appProps: { appProps }, exitDisp: { exitDisp }, dispatch } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={setStyles(this.props.exitDisp)}>
        <View style={styles.container}>
          <Text style={styles.header}>Are you sure?</Text>
          <View>
            <TouchableHighlight style={styles.button} underlayColor="#ffa200e6" onPress={() => this.actionHandle('Cancel')}> 
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} underlayColor="#ffa200e6" onPress={() => this.actionHandle('Exit')}> 
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {

    }
  }

  actionHandle = (act) => {

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

Exit.propTypes = {
  appProps: PropTypes.object,
  exitDisp: PropTypes.string,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  bgContainer: {

  },
  container: {

  },
  header: {

  },
  button: {

  }
});

const stateMap = (state) => {
  return {
    appProps: state.simpleAndroidGame,
    exitDisp: state.simpleAndroidGame.displays.menu.exit
  };
};

export default connect(stateMap)(Exit);

AppRegistry.registerComponent('SimpleAndroidGame', () => Exit);