import React, { Component } from 'react';
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

import VideoSettings from './video';

import Sound from 'react-native-sound';

import BtnBackgroundImage from '../../../assets/images/menubtn.png';

class Settings extends Component {
  render() {
    const { appDisps: { appDisps }, settingsDisp: { settingsDisp }, dispatch } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={this.setStyles(this.props.settingsDisp)}>
        <SectionList
          sections={[
            {title: 'SETTINGS', data: ['Video', 'Audio', 'Gameplay', 'Back']}
          ]}
          renderItem={({item}) =>
            <ImageBackground style={styles.btnBgImg} source={BtnBackgroundImage}>
              <TouchableHighlight 
                style={styles.btn}
                underlayColor="transparent"
                onPress={() => this.actionHandle(item)} 
                onShowUnderlay={() => this.changeUnderlayHandle(item, '#000000')}
                onHideUnderlay={() => this.changeUnderlayHandle(item, '#fafafa')}
              > 
                <Text style={this.setTextColor(item)}>{item}</Text>
              </TouchableHighlight>
            </ImageBackground>
          }
          renderSectionHeader={({section}) => 
            <View>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <View id="hr" style={styles.hr}>
                <View id="hrInner" style={styles.hrInner}/>
              </View>
            </View>
          }
          keyExtractor={(item, index) => index}
        />
        <View id="hr" style={styles.hr}>
          <View id="hrInner" style={styles.hrInner}/>
        </View>
        <VideoSettings setDisplays={actions.setDisplays} setBrightness={actions.setBrightness}/>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      textColors: {
        Video: '#fafafa',
        Audio: '#fafafa',
        Gameplay: '#fafafa',
        Back: '#fafafa'
      },
      appState: AppState.currentState,
      btnSound: new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (!error) {
          //this.state.btnSound.setNumberOfLoops(-1);
        }
      })
    }
  }

  actionHandle = (item) => {
    this.state.btnSound.play();
    let obj = this.props.appDisps;
    switch (item) {
      case 'Video':
        obj.menu.video = 'flex';
        obj.menu.audio = 'none';
        obj.menu.gameplay = 'none';
        this.props.setDisplays(obj);
        break;
      case 'Audio':
        obj.menu.audio = 'flex';
        obj.menu.video = 'none';
        obj.menu.gameplay = 'none';
        this.props.setDisplays(obj);
        break;
      case 'Gameplay':
        obj.menu.gameplay = 'flex';
        obj.menu.video = 'none';
        obj.menu.audio = 'none';
        this.props.setDisplays(obj);
        break;
      case 'Back':
        obj.menu.main = 'flex';
        obj.menu.settings = 'none';
        obj.menu.video = 'none';
        obj.menu.audio = 'none';
        obj.menu.gameplay = 'none';
        this.props.setDisplays(obj);
        break;
    }
  }

  changeUnderlayHandle = (elem, color) => {
    let obj = this.state.textColors;
    obj[elem] = color;
    this.setState({
      textColors: obj
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

  setStyles = (display) => {
    const styles = StyleSheet.create({
      container: {
        display: display,
        marginTop: 10,
        marginLeft: 10
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
}



Settings.propTypes = {
  appDisps: PropTypes.object,
  settingsDisp: PropTypes.string,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 5,
    marginBottom: 5,
    width: 300,
    fontSize: 30,
    color: '#fafafa',
    fontFamily: 'Eurostile'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'flex-start', 
    backgroundColor: '#000000',
    width: 300,
    height: 40
  },
  btnBgImg: {
    width: 300,
    height: 40
  },
  hr: {
    width: 300,
    height: 2,
    backgroundColor: '#767676',
    position: 'relative',
    alignItems: 'center'
  },
  hrInner: {
    width: 270,
    height: 2,
    backgroundColor: '#000000'
  }
});

const stateMap = (state) => {
  return {
    appDisps: state.simpleAndroidGame.displays,
    settingsDisp: state.simpleAndroidGame.displays.menu.settings
  };
};

export default connect(stateMap)(Settings);

AppRegistry.registerComponent('SimpleAndroidGame', () => Settings);