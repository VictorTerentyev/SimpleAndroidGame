import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  AppState
} from 'react-native';

import ReactExit from 'react-native-exit-app';

import * as AppActions from '../../actions/AppActions';

import Sound from 'react-native-sound';

import BtnBackgroundImage from '../../../assets/images/btn.png';

class Exit extends Component {
  render() {
    const { appDisps: { appDisps }, exitDisp: { exitDisp }, dispatch } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.bgContainer}>
        <View style={this.setDisplay(this.props.exitDisp)}>
          <View style={styles.container}>
            <Text style={styles.header}>Are you sure?</Text>
            <View style={styles.btnRow}>
              <ImageBackground style={styles.btnBgImg} source={BtnBackgroundImage}>
                <TouchableHighlight
                  style={styles.btn}
                  underlayColor="transparent"
                  onPress={() => this.actionHandle('Cancel')}
                  onShowUnderlay={() => this.changeUnderlayHandle('Cancel', '#000000')}
                  onHideUnderlay={() => this.changeUnderlayHandle('Cancel', '#ffffff')}
                > 
                  <Text style={this.setTextColor('Cancel')}>Cancel</Text>
                </TouchableHighlight>
              </ImageBackground>
              <ImageBackground style={styles.btnBgImg} source={BtnBackgroundImage}>
                <TouchableHighlight 
                  style={styles.btn}
                  underlayColor="transparent"
                  onPress={() => this.actionHandle('Exit')}
                  onShowUnderlay={() => this.changeUnderlayHandle('Exit', '#000000')}
                  onHideUnderlay={() => this.changeUnderlayHandle('Exit', '#fafafa')}
                > 
                  <Text style={this.setTextColor('Exit')}>Exit</Text>
                </TouchableHighlight>
              </ImageBackground>
            </View>
          </View>
        </View>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      textColors: {
        Cancel: '#fafafa',
        Exit: '#fafafa'
      },
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
      case 'Cancel':
        obj.menu.exit = 'none';
        this.props.setDisplays(obj);
        break;
      case 'Exit':
        ReactExit.exitApp();
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
        fontSize: 20,
        color: this.state.textColors[elem]
      }
    });
    return styles.textColor;
  }

  setDisplay = (display) => {
    const styles = StyleSheet.create({
      container: {
        display: display,
        flex: 1,
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
}

Exit.propTypes = {
  appDisps: PropTypes.object,
  exitDisp: PropTypes.string,
  dispatch: PropTypes.func
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
    width: 400,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'  
  },
  header: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 30,
    color: '#fafafa',
    fontFamily: 'Eurostile'
  },
  btnRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row' 
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#000000',
    width: 150,
    height: 40,
    marginBottom: 5
  },
  btnBgImg: {
    width: 150,
    height: 40
  }
});

const stateMap = (state) => {
  return {
    appDisps: state.simpleAndroidGame.displays,
    exitDisp: state.simpleAndroidGame.displays.menu.exit
  };
};

export default connect(stateMap)(Exit);

AppRegistry.registerComponent('SimpleAndroidGame', () => Exit);