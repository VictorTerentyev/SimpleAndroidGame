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

class ShipsList extends PureComponent {
  render() {
    const {
      state: { state },
      ships: { ships },
      dispatch,
      componentWillReceiveProps
    } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.container} renderToHardwareTextureAndroid>
        {Object.values(this.props.ships).map((e) => {
          return (
            <Ship
              key={e.id}
              id={e.id}
              health={e.health}
              positionY={e.positionY}
              positionX={e.positionX}
              side={e.side}
              removeShip={actions.removeShip}
              addShot={actions.addShot}
            /> 
          );
        })}
      </View>
    );
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.state === 'active' || nextProps.state === 'resumed') {
      this.creatEnemyShip();
    };
  }

  creatEnemyShip = () => {
    let context = this;
    let random = Math.random() * (15000 - 12000) + 500;
    (function loop() {
      random = Math.random() * (15000 - 12000) + 500;
      setTimeout(function() {
        if (context.props.state === 'active' || context.props.state === 'resumed') {
          context.props.addShip({
            id: context.props.ships.length,
            health: 3,
            position: Math.random() * Dimensions.get('window').height,
            side: 'right' 
          });
          loop();
        }
      }, random);
    }());
  }
}

ShipsList.propTypes = {
  state: PropTypes.string,
  ships: PropTypes.array,
  addShip: PropTypes.func,
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
    ships: state.simpleAndroidGame.ships
  };
};

export default connect(stateMap)(ShipsList);

AppRegistry.registerComponent('SimpleAndroidGame', () => ShipsList);