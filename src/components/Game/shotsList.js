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
import EnemyShot from './enemyShot';

class ShotsList extends PureComponent {
  render() {
    const {
      shots: { shots },
      enemyShots: { enemyShots },
      dispatch,
      componentWillReceivePorps
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.container} renderToHardwareTextureAndroid>
        {Object.values(this.state.shots).map((e) => {
          return (
            <Shot 
              key={e.id}
              id={e.id}
              position={e.position}
              removeShot={actions.removeShot}
            /> 
          );
        })}
        {Object.values(this.state.enemyShots).map((e) => {
          return (
            <Shot 
              key={e.id}
              id={e.id}
              positionY={e.positionY}
              positionX={e.positionX}
              removeEnemyShot={actions.removeEnemyShot}
            /> 
          );
        })}
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      shots: this.props.shots,
      enemyShots: this.props.enemyShots
    }
  }

  componentWillReceivePorps = (nextProps) => {
    this.setState({
      shots: nextProps.shots,
      enemyShots: nextProps.enemyShots
    });
  }
}

ShotsList.propTypes = {
  shots: PropTypes.array,
  enemyShots: PropTypes.array,
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
    shots: state.simpleAndroidGame.shots,
    enemyShots: state.simpleAndroidGame.enemyShots
  };
};

export default connect(stateMap)(ShotsList);

AppRegistry.registerComponent('SimpleAndroidGame', () => ShotsList);