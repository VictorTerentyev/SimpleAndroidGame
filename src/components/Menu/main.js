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

class MainMenu extends Component {
  render() {
    const { appProps: { appProps }, mainMenuDisp: { mainMenuDisp }, dispatch } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={setStyles(this.props.mainMenuDisp)}>
        <SectionList
          sections={[
            {title: 'MAIN MENU', data: ['Start', 'Settings', 'Credits', 'Exit']}
          ]}
          renderItem={({item}) =>
            <TouchableHighlight style={styles.button} underlayColor="#ffa200e6" onPress={() => this.actionHandle(item)}> 
              <ImageBackground style={styles.btnBgImg} source={{uri: 'menubtn.png'}}>
                <Text style={styles.listItem}>{item}</Text>
              </ImageBackground>
            </TouchableHighlight>
          }
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  constructor() {
    super();
    this.state = {

    }
  }

  actionHandle = (item) => {

  }
}

function setStyles(display) {
  const styles = StyleSheet.create({
    container: {
      display: display,
      marginTop: 10,
      marginLeft: 10
    }
  });
  return styles.container;
}

MainMenu.propTypes = {
  appProps: PropTypes.object,
  mainMenuDisp: PropTypes.string,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  container: {

  },
  listItem: {
    marginLeft: 10,
    fontSize: 20,
    color: '#fafafa',
    textShadowColor: 'rgba(255, 255, 255, 1)',
    shadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  sectionHeader: {
    width: 300,
    fontSize: 30,
    color: '#fafafa',
    textShadowColor: 'rgba(255, 255, 255, 1)',
    shadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
    fontFamily: 'Eurostile'
  },
  button: {
    justifyContent: 'center',
    width: 300,
    height: 40
  },
  btnBgImg: {
    width: '100%',
    height: '100%',
  }
});

const stateMap = (state) => {
  return {
    appProps: state.simpleAndroidGame,
    mainMenuDisp: state.simpleAndroidGame.displays.menu.main
  };
};

export default connect(stateMap)(MainMenu);

AppRegistry.registerComponent('SimpleAndroidGame', () => MainMenu);