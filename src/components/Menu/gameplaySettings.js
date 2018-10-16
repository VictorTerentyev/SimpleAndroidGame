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

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        display: this.props.display,   
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        flex: 1,
        opacity: this.props.brightness
      }
    });
    return styles.container;
  }
}

GameplaySettings.propTypes = {
  display: PropTypes.string,
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