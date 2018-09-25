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

class SettingsBackButton extends PureComponent {
  render() {
    const {
      componentWillMount,
      componentWillUnmount
    } = this.props

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.btnBgImg} source={this.state.btnBackground}>
          <TouchableHighlight 
            style={styles.btn}
            underlayColor="transparent"
            onPress={() => this.actionHandle()}
            onShowUnderlay={() => this.changeUnderlayHandle('#000000', {uri: 'menubtn'})}
            onHideUnderlay={() => this.changeUnderlayHandle('#fafafa', {})}
          > 
            <Text style={this.setTextColor()}>Back</Text>
          </TouchableHighlight>
        </ImageBackground>
      </View>
    );
  }

  constructor(props) {
    super();
    this.state = {
      appState: AppState.currentState,
      btnBackground: {},
      textColor: '#fafafa',
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
    if (['background', 'inactive'].includes(this.state.appState) && nextAppState === 'active') {
      this.state.btnSound.play();
    } else {
      this.state.btnSound.pause();
    }
    this.setState({appState: nextAppState});
  }

  actionHandle = () => {
    this.checkBtnSoundDoublePlay();
    this.props.setDisplay('settingsDisp', 'flex');
    this.props.setDisplay(this.props.currentDisplayName, 'none');
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

  checkBtnSoundDoublePlay = () => {
    if (this.state.btnSound.getCurrentTime !== 0) {
      this.state.btnSound.stop();
      this.state.btnSound.play();
    }
  }
}

SettingsBackButton.propTypes = {
  currentDisplayName: PropTypes.string,
  setDisplay: PropTypes.func,
  componentWillMount: PropTypes.func,
  componentWillUnmount: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    flex: 1
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#000000',
    width: 100,
    height: 40
  },
  btnBgImg: {
    width: 100,
    height: 40,
    marginRight: 6,
    alignSelf: 'flex-end' 
  }
});

const mapDispatchToProps = {
  setDisplay
};

export default connect(null, mapDispatchToProps)(SettingsBackButton);

AppRegistry.registerComponent('SimpleAndroidGame', () => SettingsBackButton);