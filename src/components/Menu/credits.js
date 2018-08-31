import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  AppState
} from 'react-native';

import * as AppActions from '../../actions/AppActions';

import Sound from 'react-native-sound';

class Credits extends PureComponent {
  render() {
    const { 
      display: { display },
      brightness: { brightness },
      dispatch
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.bgContainer}>
        <View style={this.setDisplay()}>
          <View style={styles.container}>
            <Text style={styles.header}>Credits</Text>
            <View style={styles.textRow}>
              <Text style={styles.text}>Developer:</Text>
              <Text style={styles.text}>Victor Terentyev</Text>
            </View>
            <ImageBackground style={styles.btnBgImg} source={this.state.btnBackground}>
              <TouchableHighlight 
                style={styles.btn}
                underlayColor="transparent"
                onPress={() => this.actionHandle()}
                onShowUnderlay={() => this.changeUnderlayHandle('#000000', {uri: 'btn'})}
                onHideUnderlay={() => this.changeUnderlayHandle('#fafafa', {})}
              > 
                <Text style={this.setTextColor()}>Back</Text>
              </TouchableHighlight>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      appState: AppState.currentState,
      btnBackground: {},
      textColor: '#fafafa',
      btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {})
    }
  }

  actionHandle = () => {
    this.checkBtnSoundDoublePlay()
    this.props.setDisplay('mainDisp', 'flex');
    this.props.setDisplay('creditsDisp', 'none');
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


  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        display: this.props.display,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
        backgroundColor: 'rgba(0,0,0,0.5)',
        opacity: this.props.brightness
      }
    });
    return styles.container;
  }

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(this.state.appState) && nextAppState === 'active') {
      this.state.btnSound.play();
    } else {
      this.state.btnSound.pause();
    }
    this.setState({appState: nextAppState});
  }

  checkBtnSoundDoublePlay = () => {
    if (this.state.btnSound.getCurrentTime !== 0) {
      this.state.btnSound.stop();
      this.state.btnSound.play();
    }
  }
}

Credits.propTypes = {
  display: PropTypes.string,
  brightness: PropTypes.number,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  container: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  header: {
    marginBottom: 15,
    fontSize: 30,
    color: '#fafafa',
    fontFamily: 'Eurostile'
  },
  textRow: {
    marginBottom: 10,
    flexDirection: 'row' 
  },
  text: {
    fontFamily: 'Eurostile',
    fontSize: 20,
    color: '#fafafa',
    marginRight: 5
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#000000',
    width: 150,
    height: 40,
  },
  btnBgImg: {
    width: 150,
    height: 40
  }
});

const stateMap = (state) => {
  return {
    display: state.simpleAndroidGame.creditsDisp,
    brightness: state.simpleAndroidGame.Brightness
  };
};

export default connect(stateMap)(Credits);

AppRegistry.registerComponent('SimpleAndroidGame', () => Credits);