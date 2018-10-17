import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';

class Hitpoints extends PureComponent {
  render() {
    const {
      hitpoints: { hitpoints }
    } = this.props;

    return (
      <View style={styles.container}>
        {this.state.hitpoints.map(e => {
          return (e);
        })}
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      hitpoints: []
    };
  }

  componentWillMount = () => {
    this.setHealth(this.props.hitpoints);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setHealth(nextProps.hitpoints);
  }

  setHealth = (hitpoints) => {
    let array = [];
    for (let i = 0; i < hitpoints; i++) {
      array.push(
        <Image 
          key={i}
          style={styles.hitpoint}
          source={{uri: 'hitpoint'}}
          resizeMode="contain"
        />
      );
    };
    this.setState({ hitpoints: array });
  }
}

Hitpoints.propTypes = {
  hitpoints: PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    width: '20%',
    height: '100%',
    flexDirection: 'row', 
  },
  hitpoint: {
    height: '100%',
    width: '33%',
    marginLeft: '5%'
  }
});

const stateMap = (state) => {
  return {
    hitpoints: state.simpleAndroidGame.hitpoints
  };
};

export default connect(stateMap)(Hitpoints);

AppRegistry.registerComponent('SimpleAndroidGame', () => Hitpoints);