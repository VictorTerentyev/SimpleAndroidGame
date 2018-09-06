import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  AppState
} from 'react-native';

import Hitpoints from './hitpoints';
import Score from './score';
import MenuBtn from './menuBtn';

class GameMenu extends PureComponent {
  render() {
    return (
      <View style={styles.menu}>
        <Hitpoints/>
        <Score/>
        <MenuBtn/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    height: '10%',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    flexDirection: 'row'  
  }
});

export default connect()(GameMenu);

AppRegistry.registerComponent('SimpleAndroidGame', () => GameMenu);