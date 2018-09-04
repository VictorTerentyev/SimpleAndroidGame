import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  AppState
} from 'react-native';

import Intro from './Intro';
import Menu from './Menu';
import Game from './Game';

class MainContainer extends PureComponent {
  render() {
    const { dispatch } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <Intro/>
        <Menu/>
        <Game/>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  }
});

MainContainer.propTypes = {
  dispatch: PropTypes.func
}

export default connect()(MainContainer);

AppRegistry.registerComponent('SimpleAndroidGame', () => MainContainer);