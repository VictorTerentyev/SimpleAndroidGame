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
  AppState
} from 'react-native';

import { setDisplay } from '../../actions/AppActions';

import Sound from 'react-native-sound';

class Settings extends PureComponent {
  render() {
    const {
      display: { display },
      brightness: { brightness },
      dispatch
    } = this.props;

    return (
      <View style={this.setDisplay()}>
        <SectionList
          sections={[
            {title: 'SETTINGS', data: ['Video', 'Audio', 'Gameplay', 'Back']}
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
      appState: AppState.currentState,
      btnBackgrounds: {
        Video: {},
        Audio: {},
        Gameplay: {},
        Back: {}
      },
      textColors: {
        Video: '#fafafa',
        Audio: '#fafafa',
        Gameplay: '#fafafa',
        Back: '#fafafa'
      },
      btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {})
    }
  }

  actionHandle = (item) => {
    this.checkBtnSoundDoublePlay();
    this.props.setDisplay('settingsDisp', 'none');
    switch (item) {
      case 'Video':
        this.props.setDisplay('videoDisp', 'flex');
        break;
      case 'Audio':
        this.props.setDisplay('audioDisp', 'flex');
        break;
      case 'Gameplay':
        this.props.setDisplay('gameplayDisp', 'flex');
        break;
      case 'Back':
        this.props.setDisplay('mainDisp', 'flex');
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



Settings.propTypes = {
  display: PropTypes.string,
  brightness: PropTypes.number,
  setDisplay: PropTypes.func,
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
    display: state.simpleAndroidGame.settingsDisp,
    brightness: state.simpleAndroidGame.Brightness
  };
};

const mapDispatchToProps = {
  setDisplay
};

export default connect(stateMap, mapDispatchToProps)(Settings);

AppRegistry.registerComponent('SimpleAndroidGame', () => Settings);