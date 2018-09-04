import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  AppState
} from 'react-native';

import { setDisplay, setGameState } from '../../actions/AppActions';

import Hitpoints from './hitpoints';
import Score from './score';

import Sound from 'react-native-sound';

class GameMenu extends PureComponent {
  render() {
    return (
      <View style={styles.menu}>
        <Hitpoints/>
        <Score/>
        <View style={styles.menuBtn}>
          <ImageBackground style={styles.btnBgImg} source={this.state.btnBackground}>
            <TouchableHighlight 
              style={styles.btn}
              underlayColor="transparent"
              onPress={() => this.menuActionHandle()}
              onShowUnderlay={() => this.changeUnderlayHandle('#000000', {uri: 'menubtn'})}
              onHideUnderlay={() => this.changeUnderlayHandle('#fafafa', {})}
            > 
              <Text style={this.setTextColor()}>MENU</Text>
            </TouchableHighlight>
          </ImageBackground>
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      textColor: '#fafafa',
      btnBackground: {},
      score: 0,
      appState: AppState.currentState,
      btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {})
    };
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  menuActionHandle = () => {
    this.checkBtnSoundDoublePlay();
    this.props.setDisplay('menuDisp', 'flex');
    this.props.setDisplay('mainDisp', 'flex');
    this.props.setDisplay('gameDisp', 'none');
    this.props.setGameState('paused');
  }

  checkBtnSoundDoublePlay = () => {
    if (this.state.btnSound.getCurrentTime !== 0) {
      this.state.btnSound.stop();
      this.state.btnSound.play();
    }
  }

  changeUnderlayHandle = (color, img) => {
    this.setState({
      btnBackground: img,
      textColor: color
    });
  }

  setTextColor = () => {
    const styles = StyleSheet.create({
      textColor: {
        fontFamily: 'Eurostile',
        fontSize: 20,
        color: this.state.textColor
      }
    });
    return styles.textColor;
  }

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(this.state.appState) && nextAppState === 'active') {
      this.state.btnSound.play();
    } else {
      this.state.btnSound.pause();
    }
    this.setState({appState: nextAppState});
  }
}

GameMenu.propTypes = {
  state: PropTypes.string,
  hitpoints: PropTypes.number,
  setGameState: PropTypes.func,
  setDisplay: PropTypes.func,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    height: '10%',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    flexDirection: 'row'  
  },
  menuBtn: {
    width: '20%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center', 
    width: '100%',
    height: '100%'
  },
  btnBgImg: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-end' 
  }
});

const stateMap = (state) => {
  return {
    state: state.simpleAndroidGame.state,
    hitpoints: state.simpleAndroidGame.hitpoints
  };
};

const mapDispatchToProps = {
  setDisplay,
  setGameState
};

export default connect(stateMap, mapDispatchToProps)(GameMenu);

AppRegistry.registerComponent('SimpleAndroidGame', () => GameMenu);