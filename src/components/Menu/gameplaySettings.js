import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  CheckBox,
  SectionList,
  TouchableHighlight,
  ImageBackground,
  AppState
} from 'react-native';

import {
  setDisplay,
  setSetting
} from '../../actions/AppActions';

import Sound from 'react-native-sound';

class GameplaySettings extends PureComponent {
  render() {
    const { 
      display: { display },
      brightness: { brightness },
      state: { state },
      componentWillReceiveProps
    } = this.props;

    return (
      <View style={this.setDisplay()}>
        <View style={styles.container}>
          <SectionList
            sections={[
              {title: 'GAMEPLAY', data: ['Hardcore']}
            ]}
            renderItem={({item}) =>
              <View style={styles.textRow}>
                <Text style={styles.title}>{item}</Text>
                <Text style={styles.text}>:</Text>
                <CheckBox 
                  style={styles.check}
                  onValueChange={(value) => this.handleCheckBoxChange(item, value)}
                  disabled={this.state['disabled' + item]}
                  value={this.state['value' + item]}
                />
              </View>
            }
            renderSectionHeader={({section}) => 
              <Text style={styles.header}>{section.title}</Text>
            }
            keyExtractor={(item, index) => index}
          />
          <View style={styles.btnContainer}>
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
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      disabledHardcore: false,
      valueHardcore: false,
      btnBackground: {},
      textColor: '#fafafa',
      btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {})
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state === 'paused') {
      this.setState({disabledHardcore: true});
    }
    if (nextProps.state === 'deactivated') {
      this.setState({disabledHardcore: false});
    } 
  }

  actionHandle = () => {
    this.checkBtnSoundDoublePlay();
    this.props.setDisplay('settingsDisp', 'flex');
    this.props.setDisplay('gameplayDisp', 'none');
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        flex: 1,
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

  handleCheckBoxChange = (item, val) => {
    this.checkBtnSoundDoublePlay();
    switch (item) {
      case 'Hardcore':
        if (val === true) {
          this.setState({valueHardcore: true});
          this.props.setSetting('mod', 'hardcore');
        } 
        else {
          this.setState({valueHardcore: false});
          this.props.setSetting('mod', 'default');
        } 
        break;
    }
  }
}

GameplaySettings.propTypes = {
  display: PropTypes.string,
  brightness: PropTypes.number,
  state: PropTypes.string,
  setDisplay: PropTypes.func,
  setSetting: PropTypes.func,
  componentWillReceiveProps: PropTypes.func
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
  },
  textRow: {
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 10,
    flexDirection: 'row' 
  },
  text: {
    fontFamily: 'Eurostile',
    fontSize: 20,
    color: '#fafafa',
    marginRight: 10
  },
  title: {
    fontFamily: 'Eurostile',
    fontSize: 20,
    color: '#fafafa',
    marginRight: 10,
    width: 100
  },
  btnContainer: {
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
  },
  check: {
    width: 50,
    height: 50
  },
  checkBgImg: {
    width: 50,
    height: 50
  }
});

const stateMap = (state) => {
  return {
    display: state.simpleAndroidGame.gameplayDisp,
    brightness: state.simpleAndroidGame.Brightness,
    state: state.simpleAndroidGame.state
  };
};

const mapDispatchToProps = {
  setDisplay,
  setSetting
};

export default connect(stateMap, mapDispatchToProps)(GameplaySettings);

AppRegistry.registerComponent('SimpleAndroidGame', () => GameplaySettings);