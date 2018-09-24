import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';

import {
  setDisplay,
  addShip,
  addEnemyShip,
  addEnemyShipHitpoints,
  addEnemyShipCurrentPosition
} from '../../actions/AppActions';

import Ship from './ship';
import EnemyShip from './enemyShip';

class ShipsList extends PureComponent {
  render() {
    const {
      state: { state },
      shipDisp: { shipDisp },
      hitpoints: { hitpoints },
      position: { position },
      enemyShips: { enemyShips },
      componentWillReceiveProps
    } = this.props;

    return (
      <View style={styles.container} renderToHardwareTextureAndroid>
        <Ship/>
        {this.props.enemyShips.map(e => {
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
      activeFlag: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.state === 'active' && this.state.activeFlag !== true) {
      this.setState({
        ship: [<Ship key={Date.now()}/>],
        activeFlag: true
      });
    }
    if (['active', 'resumed'].includes(nextProps.state)) {
      if (!this.timerHandle) {
        this.createEnemyShipLoop();
      }
    }
    if (['paused', 'deactivated'].includes(nextProps.state)) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
    if (this.props.state === 'deactivated') {
      this.setState({activeFlag: false});
    }
    if (nextProps.hitpoints === 0) {
      this.props.setDisplay({shipDisp: 'none'});
    }
  }

  createEnemyShipLoop = (value) => {
    let random = value || Math.random() * (10000 - 7000) + 500;
    this.timerHandle = setTimeout(this.createEnemyShip.bind(this), random);
  }

  createEnemyShip = () => {
    if (['active', 'resumed'].includes(this.props.state)) {
      let random = Math.random() * (10000 - 7000) + 500;
      let id = Date.now();
      this.props.addEnemyShipHitpoints({ id: id, hitpoints: 3});
      this.props.addEnemyShipCurrentPosition({ id: id, currentPosition: 0});
      this.props.addEnemyShip({
        id: id,
        positionY: Math.random() * Dimensions.get('window').height,
        positionX: 0
      });
      this.createEnemyShipLoop(random);
    }
  }
}

ShipsList.propTypes = {
  state: PropTypes.string,
  shipDisp: PropTypes.string,
  hitpoints: PropTypes.number,
  position: PropTypes.number,
  enemyShips: PropTypes.array,
  setDisplay: PropTypes.func,
  addEnemyShip: PropTypes.func,
  addEnemyShipHitpoints: PropTypes.func,
  addEnemyShipCurrentPosition: PropTypes.func,
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
    shipDisp: state.simpleAndroidGame.shipDisp,
    hitpoints: state.simpleAndroidGame.hitpoints,
    position: state.simpleAndroidGame.position,
    enemyShips: state.simpleAndroidGame.enemyShips
  };
};

const mapDispatchToProps = {
  setDisplay,
  addShip,
  addEnemyShip,
  addEnemyShipHitpoints,
  addEnemyShipCurrentPosition
};

export default connect(stateMap, mapDispatchToProps)(ShipsList);

AppRegistry.registerComponent('SimpleAndroidGame', () => ShipsList);