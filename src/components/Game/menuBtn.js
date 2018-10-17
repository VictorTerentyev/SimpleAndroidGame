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

import {
  setDisplay,
  setGameState
} from '../../actions/AppActions';

import Sound from 'react-native-sound';

class GameMenuBtn extends PureComponent {
  render() {
    return (
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
    );
  }

  constructor() {
    super();
    this.state = {
      textColor: '#fafafa',
      btnBackground: {},
      appState: AppState.currentState,
      btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {})
    };
  }

  componentWillMount = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(nextAppState) && this.state.appState === 'active') {
      this.state.btnSound.pause();
    }
    this.setState({appState: nextAppState});
  }

  menuActionHandle = () => {
    this.checkBtnSoundDoublePlay();
    this.props.setDisplay('menuDisp', true);
    this.props.setDisplay('mainDisp', true);
    this.props.setDisplay('gameDisp', false);
    this.props.setGameState('paused');
  }

  checkBtnSoundDoublePlay = () => {
    this.state.btnSound.stop();
    this.state.btnSound.play();
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
}

GameMenuBtn.propTypes = {
  setGameState: PropTypes.func,
  setDisplay: PropTypes.func
}

const styles = StyleSheet.create({
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

const mapDispatchToProps = {
  setDisplay,
  setGameState
};

export default connect(null, mapDispatchToProps)(GameMenuBtn);

AppRegistry.registerComponent('SimpleAndroidGame', () => GameMenuBtn);