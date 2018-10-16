import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  SectionList,
  ImageBackground,
  TouchableHighlight,
  Dimensions,
  AppState
} from 'react-native';

import {
  setDisplay,
  setPosition,
  setGameState,
  setGameInitialState
} from '../../actions/AppActions';

import Sound from 'react-native-sound';

class MainMenu extends PureComponent {
  render() {
    const {
      state: { state },
      display: { display },
      brightness: { brightness },
      mode: { mode }
    } = this.props;

    this.state = {
      appState: AppState.currentState,
      display: 'none',
      displayFlag: true,
      btnBackgrounds: {
        Start: {},
        Settings: {},
        Credits: {},
        Exit: {}
      },
      textColors: {
        Start: '#fafafa',
        Settings: '#fafafa',
        Credits: '#fafafa',
        Exit: '#fafafa'
      },
      btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {})
    }

    return (
      <View style={this.setDisplay()}>
        <SectionList
          sections={[
            {title: 'MAIN MENU', data: ['Start', 'Settings', 'Credits', 'Exit']}
          ]}
          renderItem={({item}) =>
            <ImageBackground style={styles.btnBgImg} source={this.state.btnBackgrounds[item]}>
              <TouchableHighlight 
                style={styles.btn}
                underlayColor="transparent"
                onPress={() => this.actionHandle(item)} 
                onShowUnderlay={() => this.changeUnderlayHandle(item, '#000000', {uri: 'menubtn'})}
                onHideUnderlay={() => this.changeUnderlayHandle(item, '#fafafa', {})}
              >
                <Text style={this.setTextColor(item)}>{item}</Text>
              </TouchableHighlight>
            </ImageBackground>
          }
          renderSectionHeader={({section}) => 
            <View>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <View id="hr" style={styles.hr}/>
            </View>
          }
          keyExtractor={(item, index) => index}
        />
        <View id="hr" style={styles.hr}/>
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

  actionHandle = (item) => {
    this.checkBtnSoundDoublePlay();
    this.props.setDisplay('mainDisp', false);
    switch (item) {
      case 'Start':
        switch (this.props.state) {
          case 'deactivated':
            if (this.props.mode === true) {
              this.props.setGameInitialState(1);
            } 
            else {
              this.props.setGameInitialState();
            };
            this.props.setGameState('active');
            break;

          case 'paused':
            this.props.setGameState('resumed');
            break;
        }
        this.props.setDisplay('menuDisp', false);
        this.props.setDisplay('mainDisp', false);
        this.props.setDisplay('gameDisp', true);
        this.props.setDisplay('shipDisp', true);
        break;
      case 'Settings':
        this.props.setDisplay('settingsDisp', true);
        break;
      case 'Credits':
        this.props.setDisplay('creditsDisp', true);
        break;
      case 'Exit':
        this.props.setDisplay('exitDisp', true);
        break;
    }
  }

  changeUnderlayHandle = (elem, color, img) => {
    let colors = this.state.textColors;
    let btnBackgrounds = this.state.btnBackgrounds;
    colors[elem] = color;
    btnBackgrounds[elem] = img;
    this.setState({
      btnBackgrounds: btnBackgrounds,
      textColors: colors
    });
  }

  setTextColor = (elem) => {
    const styles = StyleSheet.create({
      textColor: {
        fontFamily: 'Eurostile',
        marginLeft: 10,
        fontSize: 20,
        color: this.state.textColors[elem]
      }
    });
    return styles.textColor;
  }

  setDisplay = () => {
    const styles = StyleSheet.create({
      container: {
        display: this.state.display,
        marginTop: 10,
        marginLeft: 10,
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

MainMenu.propTypes = {
  state: PropTypes.string,
  display: PropTypes.bool,
  brightness: PropTypes.number,
  mode: PropTypes.bool,
  setGameState: PropTypes.func,
  setGameInitialState: PropTypes.func,
  setDisplay: PropTypes.func,
  setPosition: PropTypes.func
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 6,
    marginBottom: 6,
    width: 200,
    fontSize: 30,
    color: '#fafafa',
    fontFamily: 'Eurostile'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'flex-start', 
    backgroundColor: '#000000',
    width: 200,
    height: 40
  },
  btnBgImg: {
    width: 200,
    height: 40
  },
  hr: {
    width: 200,
    height: 2,
    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderColor: '#767676',
    backgroundColor: '#000000'
  }
});

const stateMap = (state) => {
  return {
    state: state.simpleAndroidGame.state,
    display: state.simpleAndroidGame.mainDisp,
    brightness: state.simpleAndroidGame.Brightness,
    mode: state.simpleAndroidGame.mode
  };
};

const mapDispatchToProps = {
  setDisplay,
  setPosition,
  setGameState,
  setGameInitialState
};

export default connect(stateMap, mapDispatchToProps)(MainMenu);

AppRegistry.registerComponent('SimpleAndroidGame', () => MainMenu);