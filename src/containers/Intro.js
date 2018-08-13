import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  Dimensions,
  AppState
} from 'react-native';

import Video from 'react-native-video';
import NVidia from '../../assets/videos/nvidia.mp4';
import AMD from '../../assets/videos/amd.mp4';
import UE4 from '../../assets/videos/ue4.mp4';
import Frontier from '../../assets/videos/frontier.mp4';

class intro extends Component {
  render() {
    const { introState: { introState }, dispatch, componentDidMount } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);

    return (
      <View style={styles.container}>
        <Video 
          playInBackground
          playWhenInactive
          resizeMode='cover'
          source={Menu}
          style={styles.backgroundVideo}
        />
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      exist: true,
      source: NVidia
    }
  }

  destructor() {
    this.state.exist === true ? 
  }
}

intro.propTypes = {
  introState: PropTypes.object,
  dispatch: PropTypes.func
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: -2,
    right: 0
  }
});

const stateMap = (state) => {
  return {
    introState: state.intro
  };
};

export default connect(stateMap)(intro);