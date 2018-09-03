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
      hitpoints: { hitpoints },
      dispatch,
      componentWillReceiveProps
    } = this.props;

    return (
      <View style={styles.container}>
        {this.state.hitpoints.map(e => {
          return (e);
        })}
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      hitpoints: []
    };
  }

  componentDidMount = () => {
    this.setHealth();
  }

  componentWillReceiveProps = () => {
    this.setHealth();
  }

  setHealth = () => {
    let array = [];
    for (let i = 0; i < this.props.hitpoints; i++) {
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
  hitpoints: PropTypes.number,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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