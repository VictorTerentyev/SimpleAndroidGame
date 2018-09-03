import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';

import * as AppActions from '../../actions/AppActions';

import Ship from './ship';
import EnemyShip from './enemyShip';

class ShipsList extends PureComponent {
  render() {
    const {
      state: { state },
      hitpoints: { hitpoints },
      position: { position },
      enemyShips: { enemyShips },
      dispatch,
      componentWillReceiveProps
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.container} renderToHardwareTextureAndroid>
        <Ship/>
        {Object.values(this.state.enemyShips).map((e) => {
          return (
            <EnemyShip
              key={e.id}
              id={e.id}
              health={e.health}
              positionY={e.positionY}
              positionX={e.positionX}
              removeEnemyShip={actions.removeEnemyShip}
              addEnemyShot={actions.addEnemyShot}
            /> 
          );
        })}
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      enemyShips: this.props.enemyShips,
      loopState: 'deactivated'
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.state === 'active' || nextProps.state === 'resumed') {
      if (this.state.loopState !== 'active') {
        this.creatEnemyShipLoop();
        this.setState({loopState: 'active'});
      }
    }
  }

  creatEnemyShipLoop = (value) => {
    let random = value || Math.random() * (15000 - 12000) + 500;
    setTimeout(this.creatEnemyShip.bind(this), random);
    this.setState({enemyShips: this.props.enemyShips});
    this.forceUpdate();
  }

  creatEnemyShip = () => {
    let random = Math.random() * (15000 - 12000) + 500;
    if (this.props.state === 'active' || this.props.state === 'resumed') {
      this.props.addEnemyShip({
        id: this.props.enemyShips.length,
        hitpoints: 3,
        positionY: Math.random() * Dimensions.get('window').height,
        positionX: 0
      });
      this.creatEnemyShipLoop(random);
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
  dispatch: PropTypes.func,
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

export default connect(stateMap)(ShipsList);

AppRegistry.registerComponent('SimpleAndroidGame', () => ShipsList);