import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import * as AppActions from '../../actions/AppActions';

import Shot from './shot';

class ShotsList extends PureComponent {
  render() {
    const {
      shots: { shots },
      dispatch
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.container} renderToHardwareTextureAndroid>
        {Object.values(this.props.shots).map((e) => {
          return (
            <Shot 
              key={e.id}
              id={e.id}
              positionY={e.positionY}
              positionX={e.positionX}
              side={e.side}
              removeShot={actions.removeShot}
            /> 
          );
        })}
      </View>
    );
  }
}

ShotsList.propTypes = {
  shots: PropTypes.array,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

const stateMap = (state) => {
  return {
    shots: state.simpleAndroidGame.shots
  };
};

export default connect(stateMap)(ShotsList);

AppRegistry.registerComponent('SimpleAndroidGame', () => ShotsList);