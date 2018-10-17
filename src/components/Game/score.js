import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

class Score extends PureComponent {
  render() {
    const {
      score: { score }
    } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{'Score: ' + this.state.score}</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({score: nextProps.score});
  }
}

Score.propTypes = {
  score: PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    width: '60%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center' 
  },
  text: {
    fontSize: 20,
    color: '#fafafa'
  }
});

const stateMap = (state) => {
  return {
    score: state.simpleAndroidGame.score
  };
};

export default connect(stateMap)(Score);

AppRegistry.registerComponent('SimpleAndroidGame', () => Score);