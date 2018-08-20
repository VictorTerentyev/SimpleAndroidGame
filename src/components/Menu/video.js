import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Slider,
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  AppState
} from 'react-native';

import * as AppActions from '../../actions/AppActions';

import Sound from 'react-native-sound';

import BtnBackgroundImage from '../../../assets/images/menubtn.png';

class VideoSettings extends Component {
  render() {
    const { 
      appDisps: { appDisps },
      videoDisp: { videoDisp },
      brightness: { brightness },
      componentWillReceiveProps,
      dispatch 
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={this.setDisplay(this.props.videoDisp)}>
        <View style={styles.container}>
          <Text style={styles.header}>VIDEO</Text>
          <View style={styles.textRow}>
            <Text style={styles.title}>Brightness</Text>
            <Text style={styles.text}>:</Text>
            <Text style={styles.text}>10</Text>
            <ImageBackground style={styles.sldBgImg} source={BtnBackgroundImage}>
              <Slider 
                style={styles.sld}
                minimumValue={0.1}
                onValueChange={(value) => this.handleSliderValueChange(value)}
                value={this.state.brightness}
              />
            </ImageBackground>
            <Text style={styles.text}>100</Text>
          </View>
          <ImageBackground style={styles.btnBgImg} source={BtnBackgroundImage}>
            <TouchableHighlight 
              style={styles.btn}
              underlayColor="transparent"
              onPress={() => this.actionHandle()}
              onShowUnderlay={() => this.changeUnderlayHandle('#000000')}
              onHideUnderlay={() => this.changeUnderlayHandle('#fafafa')}
            > 
              <Text style={this.setTextColor()}>Back</Text>
            </TouchableHighlight>
          </ImageBackground>
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      brightness: 1.0,
      textColor: '#fafafa',
      appState: AppState.currentState,
      btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (!error) {
          //this.state.btnSound.setNumberOfLoops(-1);
        }
      })
    }
  }

  actionHandle = () => {
    this.state.btnSound.play();
    let obj = this.props.appDisps;
    obj.menu.video = 'none';
    this.props.setDisplays(obj);
  }

  changeUnderlayHandle = (color) => {
    this.setState({
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


  setDisplay = (display) => {
    const styles = StyleSheet.create({
      container: {
        display: display,
        justifyContent: 'center',
        alignItems: 'center',  
        backgroundColor: 'rgba(0,0,0,0.5)'
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

  handleSliderValueChange = (brightness) => {
    alert(brightness);
    if(this.state.brightness !== brightness) {
      this.setState({ brightness: brightness});
      this.props.setBrightness(brightness);
    }  
  }
}

VideoSettings.propTypes = {
  appDisps: PropTypes.object,
  videoDisp: PropTypes.string,
  brightness: PropTypes.number,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
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
    marginRight: 10
  },
  title: {
    fontFamily: 'Eurostile',
    fontSize: 20,
    color: '#fafafa',
    marginRight: 10,
    width: 100
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
  },
  sld: {
    width: 300,
    height: 20,
    borderRadius: 0
  },
  sldBgImg: {
    width: 300,
    height: 20
  }
});

const stateMap = (state) => {
  return {
    appDisps: state.simpleAndroidGame.displays,
    videoDisp: state.simpleAndroidGame.displays.menu.video,
    brightness: state.simpleAndroidGame.settings.videoSettings.brightness
  };
};

export default connect(stateMap)(VideoSettings);

AppRegistry.registerComponent('SimpleAndroidGame', () => VideoSettings);