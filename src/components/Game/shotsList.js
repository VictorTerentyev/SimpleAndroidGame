import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import Shot from './shot';
import EnemyShot from './enemyShot';

class ShotsList extends PureComponent {
  render() {
    const {
      shots: { shots },
      enemyShots: { enemyShots }
    } = this.props;

    return (
      <View style={styles.container} renderToHardwareTextureAndroid>
        {this.props.shots.map((e) => {
          return (
            <Shot 
              key={e.id}
              id={e.id}
              positionY={e.positionY}
            /> 
          );
        })}
        {this.props.enemyShots.map((e) => {
          return (
            <EnemyShot 
              key={e.id}
              id={e.id}
              positionY={e.positionY}
              positionX={e.positionX}
            /> 
          );
        })}
      </View>
    );
  }
}

ShotsList.propTypes = {
  shots: PropTypes.array,
  enemyShots: PropTypes.array
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