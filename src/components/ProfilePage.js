import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
  Linking
} from 'react-native';
import { connect } from 'react-redux';

class ProfilePage extends Component {
  render () {
    const { profileInfo: { profileInfo }, profilePageDisp: { profilePageDisp }, dispatch } = this.props;
    return (
      <View style={setStyles(this.props.profilePageDisp)}>
        <Text style={styles.profilePage}>Profile Page:</Text>
        <View style={styles.profileInfoRow}>
          <Image
            style={styles.profileInfoImg}
            source={{uri: this.props.profileInfo.avatarfull}}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoText}>Name: {this.props.profileInfo.personaname}</Text>
            <Text style={styles.profileInfoText}>Last log off: {this.dateFormat(this.props.profileInfo.lastlogoff)}</Text>
            <Text style={styles.profileInfoText}>Time created: {this.dateFormat(this.props.profileInfo.timecreated)}</Text>
            <TouchableHighlight style={styles.profileInfoUrl} underlayColor="#ffa200e6" onPress={() => Linking.openURL(this.props.profileInfo.profileurl)}>
              <Text style={styles.profileInfoUrlText}>Page on Steam</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  dateFormat(date) {
    if(typeof date !== 'string') {
      return (new Date(date*1000)).toLocaleString('ru-RU',{
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}

ProfilePage.propTypes = {
  profileInfo: PropTypes.object,
  profilePageDisp: PropTypes.string,
  dispatch: PropTypes.func
}

function setStyles(display) {
  const styles = StyleSheet.create({
    profilePage: {
      display: display,
      width: 320,
      marginBottom: 20,
      alignSelf: 'center'
    }
  });
  return styles.profilePage;
}

const styles = StyleSheet.create({
  profilePage: {
    fontFamily: 'Pixel LCD-7',
    color: '#ffee0a',
    fontSize: 20,
    marginBottom: 10
  },
  profileInfoRow: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  profileInfoImg: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: '#ffee0a',
    borderRadius: 2
  },
  profileInfo: {
    marginLeft: 20,
    width:200
  },
  profileInfoText: {
    fontFamily: 'Pixel LCD-7',
    color: '#ffee0a',
    fontSize: 14,
    marginBottom: 5
  },
  profileInfoUrl: {
    backgroundColor: '#ffee0a',
    width: 192,
    borderRadius: 2,
    padding: 5
  },
  profileInfoUrlText: {
    fontFamily: 'Pixel LCD-7',
    fontSize: 14,
    color:'#d80000',
    textAlign: 'center'
  }
});

const stateMap = (state) => {
  return {
    profileInfo: state.steamApp.content,
    profilePageDisp: state.steamApp.displays.profilePageDisp
  };
};

export default connect(stateMap)(ProfilePage);

AppRegistry.registerComponent('RedSteamApp', () => ProfilePage);