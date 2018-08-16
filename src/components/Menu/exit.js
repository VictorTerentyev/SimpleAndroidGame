import React, { Component, BackAndroid } from 'react';
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

import * as AppActions from '../../actions/AppActions';

import BtnBackgroundImage from '../../../assets/images/menubtn.png';

class Exit extends Component {
  render() {
    const { appDisps: { appDisps }, exitDisp: { exitDisp }, dispatch } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={this.setDisplay(this.props.exitDisp)}>
        <View style={styles.container}>
          <Text style={styles.header}>Are you sure?</Text>
          <View>
            <ImageBackground style={styles.btnBgImg} source={BtnBackgroundImage}>
              <TouchableHighlight
                style={styles.button}
                underlayColor="transparent"
                onPress={() => this.actionHandle('Cancel')}
              > 
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
            </ImageBackground>
            <ImageBackground style={styles.btnBgImg} source={BtnBackgroundImage}>
              <TouchableHighlight 
                style={styles.button}
                underlayColor="#transparent"
                onPress={() => this.actionHandle('Exit')}
              > 
                <Text style={styles.buttonText}>Exit</Text>
              </TouchableHighlight>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }

  actionHandle = (item) => {
    let obj = this.props.appDisps;
    switch (item) {
      case 'Cancel':
        obj.menu.exit = 'none';
        this.props.setDisplays(obj);
        break;
      case 'Exit':
        BackAndroid.exitApp();
        break;
    }
  }

  setDisplay = (display) => {
    const styles = StyleSheet.create({
      container: {
        display: display,
        position: 'absolute',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
      }
    });
    return styles.container;
  }
}

Exit.propTypes = {
  appDisps: PropTypes.object,
  exitDisp: PropTypes.string,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 400,
    top: '37%'
  },
  header: {
    marginTop: 5,
    marginBottom: 5,
    width: 300,
    fontSize: 30,
    color: '#fafafa',
    fontFamily: 'Eurostile'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#000000',
    width: 300,
    height: 40
  },
  buttonText: {
    fontFamily: 'Eurostile',
    marginLeft: 10,
    fontSize: 20,
    color: '#000000'
  },
  btnBgImg: {
    width: 300,
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