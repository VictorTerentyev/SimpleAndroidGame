import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
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

import * as AppActions from '../../actions/AppActions';

import Sound from 'react-native-sound';

class MainMenu extends PureComponent {
  render() {
    const {
      appDisps: { appDisps },
      display: { display },
      brightness: { brightness },
      game: { game },
      dispatch
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

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

  constructor() {
    super();
    this.state = {
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
      appState: AppState.currentState,
      btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {})
    }
  }

  actionHandle = (item) => {
    this.checkBtnSoundDoublePlay();
    let obj = this.props.appDisps;
    switch (item) {
      case 'Start':
        obj.menu.menu = 'none';
        obj.menu.main = 'none';
        obj.game = 'flex';
        switch (this.props.game.state) {
          case 'deactivated':
            this.props.setPosition(Dimensions.get('window').height * 0.30);
            this.props.setGameState('active');
            break;

          case 'paused':
            this.props.setGameState('resumed');
            break;
        }
        this.props.setDisplays(obj);
        
        break;
      case 'Settings':
        obj.menu.main = 'none';
        obj.menu.settings = 'flex';
        this.props.setDisplays(obj);
        break;
      case 'Credits':
        obj.menu.credits = 'flex';
        this.props.setDisplays(obj);
        break;
      case 'Exit':
        obj.menu.exit = 'flex';
        this.props.setDisplays(obj);
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
        display: this.props.display,
        marginTop: 10,
        marginLeft: 10,
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

MainMenu.propTypes = {
  appDisps: PropTypes.object,
  display: PropTypes.string,
  brightness: PropTypes.number,
  game: PropTypes.object,
  dispatch: PropTypes.func
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
    appDisps: state.simpleAndroidGame.displays,
    display: state.simpleAndroidGame.displays.menu.main,
    brightness: state.simpleAndroidGame.settings.videoSettings.Brightness,
    game: state.simpleAndroidGame.game
  };
};

export default connect(stateMap)(MainMenu);

AppRegistry.registerComponent('SimpleAndroidGame', () => MainMenu);