import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  AppState,
  AsyncStorage
} from 'react-native';

import { setSetting } from '../../actions/AppActions';

import Sound from 'react-native-sound';

class ModeCheckbox extends PureComponent {
  render() {
    const {
      state: { state },
      mode: { mode }
    } = this.props;

    this.state = {
      appState: AppState.currentState,
      disabled: false,
      buttonBackgroundColor: '#fafafa',
      sound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {})
    };

    this.getPropFromAsyncStorage();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hardcore</Text>
        <Text style={styles.text}>:</Text>
        <TouchableHighlight
          style={[
            this.setButtonStyle(),
            styles.button
          ]}
          disabled={this.state.disabled}
          onPress={() => this.handleCheckboxChange(this.props.value)}
        >
          <View/>
        </TouchableHighlight>
      </View>
    );
  }
  
  componentWillMount = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.state === 'paused') {
      this.setState({disabled: true});
    };
    if (nextProps.state === 'deactivated') {
      this.setState({disabled: false});
    };
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (['background', 'inactive'].includes(nextAppState) && this.state.appState === 'active') {
      this.state.sound.pause();
    };
    this.setState({appState: nextAppState});
  }

  handleCheckboxChange = (val) => {
    this.checkSoundDoublePlay();
    this.setPropToAsyncStorage(val);
  }

  setButtonStyle = () => {
    const styles = StyleSheet.create({
      button: {
        backgroundColor: this.state.buttonBackgroundColor
      }
    });
    return styles.button;
  }

  checkSoundDoublePlay = () => {
    this.state.sound.stop();
    this.state.sound.play();
  }

  setPropToAsyncStorage = async (value) => {
    try {
      if (value === true) {
        await AsyncStorage.setItem('mode', JSON.stringify(false)).then(() => {
          this.props.setSetting('mode', false);
          this.setState({
            buttonBackgroundColor: '#fafafa'
          });
        });
      }
      else {
        await AsyncStorage.setItem('mode', JSON.stringify(true)).then(() => {
          this.props.setSetting('mode', true);
          this.setState({
            buttonBackgroundColor: '#fdb023'
          });
        });
      };
    }
    catch (error) {
      console.log(error.message);
    };
  }

  getPropFromAsyncStorage = async () => {
    try {
      await AsyncStorage.getItem('mode').then((val) => {
        if ([null, false].includes(JSON.parse(val))) {
          this.props.setSetting('mode', false);
          this.setState({
            buttonBackgroundColor: '#fafafa'
          });
        }
        else {
          this.props.setSetting('mode', true);
          this.setState({
            buttonBackgroundColor: '#fdb023'
          });
        };
      });
    }
    catch (error) {
      console.log(error.message);
    };
  }
}

ModeCheckbox.propTypes = {
  state: PropTypes.string,
  mode: PropTypes.bool,
  setSetting: PropTypes.func,
  componentWillMount: PropTypes.func,
  componentWillReceiveProps: PropTypes.func,
  componentWillUnmount: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 10,
    flexDirection: 'row' 
  },
  title: {
    fontFamily: 'Eurostile',
    fontSize: 20,
    color: '#fafafa',
    marginRight: 10,
    width: 100
  },
  text: {
    fontFamily: 'Eurostile',
    fontSize: 20,
    color: '#fafafa',
    marginRight: 25
  },
  button: {
    borderWidth: 1,
    borderColor: '#fd8723',
    height: 25,
    width: 25
  }
});

const stateMap = (state) => {
  return {
    state: state.simpleAndroidGame.state,
    mode: state.simpleAndroidGame.mode
  };
};

const mapDispatchToProps = {
  setSetting
};

export default connect(stateMap, mapDispatchToProps)(ModeCheckbox);

AppRegistry.registerComponent('SimpleAndroidGame', () => ModeCheckbox);