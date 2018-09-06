import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';

import { addShip, addEnemyShip } from '../../actions/AppActions';

import Ship from './ship';
import EnemyShip from './enemyShip';

class ShipsList extends PureComponent {
  render() {
    const {
      state: { state },
      hitpoints: { hitpoints },
      position: { position },
      enemyShips: { enemyShips },
      componentWillReceiveProps
    } = this.props;

    return (
      <View style={styles.container} renderToHardwareTextureAndroid>
        <Ship/>
        {this.props.enemyShips.map((e) => {
          return (
            <EnemyShip
              key={e.id}
              id={e.id}
              health={e.health}
              positionY={e.positionY}
              positionX={e.positionX}
            /> 
          );
        })}
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      loopState: 'deactivated'
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (['active', 'resumed'].includes(nextProps.state)) {
      if (this.state.loopState !== 'active') {
        this.createEnemyShipLoop();
        this.setState({loopState: 'active'});
      }
    }
  }

  createEnemyShipLoop = (value) => {
    let random = value || Math.random() * (10000 - 7000) + 500;
    setTimeout(this.createEnemyShip.bind(this), random);
  }

  createEnemyShip = () => {
    let random = Math.random() * (10000 - 7000) + 500;
    if (['active', 'resumed'].includes(this.props.state)) {
      this.props.addEnemyShip({
        id: Date.now(),
        hitpoints: 3,
        positionY: Math.random() * Dimensions.get('window').height,
        positionX: 0
      });
      this.createEnemyShipLoop(random);
    } else {
      this.setState({loopState: 'deactivated'});
      return;
    }
  }
}

ShipsList.propTypes = {
  state: PropTypes.string,
  hitpoints: PropTypes.number,
  position: PropTypes.number,
  enemyShips: PropTypes.array,
  addEnemyShip: PropTypes.func,
  componentWillReceiveProps: PropTypes.func
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
    state: state.simpleAndroidGame.state,
    hitpoints: state.simpleAndroidGame.hitpoints,
    position: state.simpleAndroidGame.position,
    enemyShips: state.simpleAndroidGame.enemyShips
  };
};

const mapDispatchToProps = {
  addShip,
  addEnemyShip
};

export default connect(stateMap, mapDispatchToProps)(ShipsList);

AppRegistry.registerComponent('SimpleAndroidGame', () => ShipsList);