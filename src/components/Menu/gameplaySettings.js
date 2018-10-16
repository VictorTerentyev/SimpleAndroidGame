import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

import ModeCheckbox from './gameplaySettingsModeCheckbox';
import BackButton from './settingsItemsBackButton';

class GameplaySettings extends PureComponent {
  render() {
    const { 
      display: { display },
      brightness: { brightness }
    } = this.props;

    this.state = {
      display: 'none',
      displayFlag: true
    }

    return (
      <View style={this.setDisplay()}>
        <View style={styles.container}>
          <Text style={styles.header}>GAMEPLAY</Text>
          <ModeCheckbox/>
          <BackButton currentDisplayName='gameplayDisp'/>
        </View>
      </View>
    );
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.display === true && this.state.displayFlag === true) {
      this.setDisplayState('flex', false);
    };
    if (nextProps.display === false && this.state.displayFlag === false) {
      this.setDisplayState('none', true);
    };
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        display: this.state.display,   
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        flex: 1,
        opacity: this.props.brightness
      }
    });
    return styles.container;
  }

  setDisplayState = (display, flag) => {
    this.setState({
      display: display,
      displayFlag: flag
    });
  }
}

GameplaySettings.propTypes = {
  display: PropTypes.bool,
  brightness: PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: 6,
    marginLeft: 6,
    marginBottom: 16,
    fontSize: 30,
    color: '#fafafa',
    fontFamily: 'Eurostile'
  }
});

const stateMap = (state) => {
  return {
    display: state.simpleAndroidGame.gameplayDisp,
    brightness: state.simpleAndroidGame.Brightness
  };
};

export default connect(stateMap)(GameplaySettings);

AppRegistry.registerComponent('SimpleAndroidGame', () => GameplaySettings);