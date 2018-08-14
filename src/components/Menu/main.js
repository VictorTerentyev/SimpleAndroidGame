import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  SectionList,
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
            {title: 'Main Menu', data: ['Start', 'Settings', 'Credits', 'Exit']}
          ]}
          renderItem={({item}) =>
            <TouchableHighlight style={styles.button} underlayColor="#ffa200e6" onPress={this.actionHandle(item)}> 
              <Text style={styles.listItem}>{item}</Text>
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
}

function setStyles(display) {
  const styles = StyleSheet.create({
    container: {
      display: display
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

  },
  sectionHeader: {

  },
  button: {

  }
});

const stateMap = (state) => {
  return {
    appProps: state.simpleAndroidGames,
    mainMenuDisp: state.simpleAndroidGame.displays.menu.main
  };
};

export default connect(stateMap)(MainMenu);

AppRegistry.registerComponent('SimpleAndroidGame', () => MainMenu);