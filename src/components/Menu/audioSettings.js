import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Slider,
  SectionList,
  TouchableHighlight,
  ImageBackground,
  AppState
} from 'react-native';

import * as AppActions from '../../actions/AppActions';

import Sound from 'react-native-sound';

class AudioSettings extends PureComponent {
  render() {
    const { 
      display: { display },
      brightness: { brightness },
      volume: { volume },
      effects: { effects },
      music: { music },
      video: { video },
      componentWillReceiveProps,
      dispatch 
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={this.setDisplay()}>
        <View style={styles.container}>
          <SectionList
            sections={[
              {title: 'AUDIO', data: ['Volume', 'Effects', 'Music', 'Video']}
            ]}
            renderItem={({item}) =>
              <View style={styles.textRow}>
                <Text style={styles.title}>{item}</Text>
                <Text style={styles.text}>:</Text>
                <Text style={styles.text}>0</Text>
                <ImageBackground style={styles.sldBgImg} source={{uri: 'menubtn'}}>
                  <Slider 
                    style={styles.sld}
                    minimumTrackTintColor={'#fdb023'}
                    maximumTrackTintColor={'#fdb023'}
                    thumbTintColor={'#fd8723'}
                    onValueChange={(value) => this.handleSliderValueChange(value, item)}
                    value={this.state[item]}
                  />
                </ImageBackground>
                <Text style={styles.afterText}>100</Text>
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
      Volume: this.props.volume,
      Effects: this.props.effects,
      Music: this.props.music,
      Video: this.props.video,
      btnBackground: {},
      textColor: '#fafafa',
      btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {}),
      bgMenuMusic: new Sound('menu.mp3', Sound.MAIN_BUNDLE, (error) => {}),
      bgGameMusic: new Sound('mgame.mp3', Sound.MAIN_BUNDLE, (error) => {})
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state.btnSound.setVolume(nextProps.volume * nextProps.effects);
    this.state.bgMenuMusic.setVolume(nextProps.volume * nextProps.music);
    this.state.bgGameMusic.setVolume(nextProps.volume * nextProps.music);
  }

  actionHandle = () => {
    this.checkBtnSoundDoublePlay();
    this.props.setDisplay('settingsDisp', 'flex');
    this.props.setDisplay('audioDisp', 'none');
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

  handleSliderValueChange = (val, item) => {
    this.setState({ [item]: val });
    this.props.setSetting(item, val);
    if (this.state.btnSound.getCurrentTime !== 0) {
      this.state.btnSound.stop();
      this.state.btnSound.play();
    }
  }
}

AudioSettings.propTypes = {
  display: PropTypes.string,
  brightness: PropTypes.number,
  volume: PropTypes.number,
  effects: PropTypes.number,
  music: PropTypes.number,
  effects: PropTypes.number,
  video: PropTypes.number,
  setDisplay: PropTypes.func,
  setSetting: PropTypes.func,
  dispatch: PropTypes.func
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
  afterText: {
    fontFamily: 'Eurostile',
    fontSize: 20,
    color: '#fafafa',
    marginLeft: 10
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
  sld: {
    width: 350,
    height: 20,
    marginTop: 1
  },
  sldBgImg: {
    width: 350,
    height: 20
  }
});

const stateMap = (state) => {
  return {
    display: state.simpleAndroidGame.audioDisp,
    brightness: state.simpleAndroidGame.Brightness,
    volume: state.simpleAndroidGame.Volume,
    effects: state.simpleAndroidGame.Effects,
    music: state.simpleAndroidGame.Music,
    video: state.simpleAndroidGame.Video
  };
};

export default connect(stateMap)(AudioSettings);

AppRegistry.registerComponent('SimpleAndroidGame', () => AudioSettings);