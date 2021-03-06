import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  AppState
} from 'react-native';

import { setDisplay } from '../../actions/AppActions';

import Sound from 'react-native-sound';

class Credits extends PureComponent {
  state = {
    appState: AppState.currentState,
    display: 'none',
    displayFlag: true,
    btnBackground: {},
    textColor: '#fafafa',
    btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {})
  };

  render() {
    const { 
      display: { display },
      brightness: { brightness }
    } = this.props;

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

  componentWillMount = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.display === true && this.state.displayFlag === true) {
      this.setDisplayState('flex', false);
    };
    if (nextProps.display === false && this.state.displayFlag === false) {
      this.setDisplayState('none', true);
    };
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

  actionHandle = () => {
    this.checkBtnSoundDoublePlay()
    this.props.setDisplay('mainDisp', true);
    this.props.setDisplay('creditsDisp', false);
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
        display: this.state.display,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
        backgroundColor: 'rgba(0,0,0,0.5)',
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

  checkBtnSoundDoublePlay = () => {
    this.state.btnSound.stop();
    this.state.btnSound.play();
  }
}

Credits.propTypes = {
  display: PropTypes.bool,
  brightness: PropTypes.number,
  componentWillMount: PropTypes.func,
  componentWillUnmount: PropTypes.func
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

const mapDispatchToProps = {
  setDisplay
};

export default connect(stateMap, mapDispatchToProps)(Credits);

AppRegistry.registerComponent('SimpleAndroidGame', () => Credits);