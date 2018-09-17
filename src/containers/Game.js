import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  AppState
} from 'react-native';

import Background from '../components/Game/background';
import Menu from '../components/Game/menu';
import ShipsList from '../components/Game/shipsList';
import ShotsList from '../components/Game/shotsList';
import Controller from '../components/Game/controller';

import {
  setDisplay,
  setGameState
} from '../actions/AppActions';

import Sound from 'react-native-sound';

class Game extends PureComponent {
  render() {
    const {
      state: { state },
      display: { display },
      brightness: { brightness },
      componentDidMount,
      componentWillReceiveProps
    } = this.props;

    return (
      <View style={this.setDisplay()}>
        <Background/>
        <View style={this.setBrightness()}>
          <Menu/>
          <View style={styles.game}>
            <ShipsList/>
            <ShotsList/>
          </View>
        </View>
        <Controller/>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      bgMusic: new Sound('mgame.mp3', Sound.MAIN_BUNDLE, (error) => {this.state.bgMusic.setNumberOfLoops(-1)}),
    };
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps = (nextProps) => {
    if(['active', 'resumed'].includes(nextProps.state)) {
      this.state.bgMusic.play();
    } else { 
      this.state.bgMusic.pause();
    };
  }
  
  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        display: this.props.display
      }
    });
    return styles.container;
  }

  setBrightness = () => {
    let styles = StyleSheet.create({
      container: {
        flex: 1,
        opacity: this.props.brightness
      }
    });
    return styles.container;
  }

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(this.state.appState) && nextAppState === 'active') {
      this.state.bgMusic.play();
    } else {
      this.state.bgMusic.pause();
      if (this.props.display === 'flex') {
        this.props.setDisplay('menuDisp', 'flex');
        this.props.setDisplay('mainDisp', 'flex');
        this.props.setDisplay('gameDisp', 'none');
        this.props.setGameState('paused');
      }
    }
    this.setState({appState: nextAppState});
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
}

Game.propTypes = {
  state: PropTypes.string,
  hitpoints: PropTypes.number,
  position: PropTypes.number,
  shots: PropTypes.array,
  display: PropTypes.string,
  brightness: PropTypes.number,
  setGameState: PropTypes.func,
  setDisplay: PropTypes.func
}

const styles = StyleSheet.create({
  game: {
    width: '100%',
    height: '90%',
  }
});

const stateMap = (state) => {
  return {
    state: state.simpleAndroidGame.state,
    hitpoints: state.simpleAndroidGame.hitpoints,
    position: state.simpleAndroidGame.position,
    shots: state.simpleAndroidGame.shots,
    display: state.simpleAndroidGame.gameDisp,
    brightness: state.simpleAndroidGame.Brightness
  };
};

const mapDispatchToProps = {
  setDisplay,
  setGameState
};

export default connect(stateMap, mapDispatchToProps)(Game);

AppRegistry.registerComponent('SimpleAndroidGame', () => Game);