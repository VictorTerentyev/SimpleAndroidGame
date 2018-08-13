import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  SectionList,
  Dimensions,
  AppState
} from 'react-native';

class mainMenu extends Component {
  render() {
    const { mainMenuState: { mainMenuState }, dispatch, componentDidMount } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'Main Menu', data: ['Start', 'Settings', 'Credits', 'Exit']}
          ]}
          renderItem={({item}) => <Text style={styles.listItem}>{item}</Text>}
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

mainMenu.propTypes = {
  mainMenuState: PropTypes.object,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  
});

const stateMap = (state) => {
  return {
    mainMenuState: state.mainMenu
  };
};

export default connect(stateMap)(mainMenu);