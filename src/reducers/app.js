import * as types from '../constants/ActionTypes';
import NVidia from '../../assets/videos/nvidia.mp4';
import AMD from '../../assets/videos/amd.mp4';
import UE4 from '../../assets/videos/ue4.mp4';
import Frontier from '../../assets/videos/frontier.mp4';

const initialState = {
  introVids: [NVidia, AMD, UE4, Frontier],
  videoPaused: {
    intro: false,
    menu: true
  },
  displays: {
    intro: 'flex',
    game: 'none',
    menu: {
      menu: 'none',
      main: 'none',
      settings: 'none',
      video: 'none',
      audio: 'none',
      gameplay: 'none',
      credits: 'none',
      exit: 'none'
    }
  },
  settings: {
    videoSettings: {
      Brightness: 1.0
    },
    audioSettings: {
      Volume: 1.0,
      Effects: 1.0,
      Music: 1.0,
      Video: 1.0
    },
    gameSettings: {
      mod: 'default'
    }
  },
  game: {
    render: false,
    ships: []
  }
}

export default function simpleAndroidGame (state = initialState, action) {

  switch (action.type) {

    case types.SET_DISPLAYS:
      return ({
        ...state,
        displays: action.displays || initialState.displays
      })

    case types.VIDEO_PLAY:
      return ({
        ...state,
        videoPaused: action.videoPaused || initialState.vidioPaused,
      })

    case types.SET_VIDEO_SETTINGS:
      return ({
        ...state,
        settings: {
          videoSettings: action.settings || initialState.settings.videoSettings,
          audioSettings: state.settings.audioSettings
        }
      })

    case types.SET_AUDIO_SETTINGS:
      return ({
        ...state,
        settings: {
          videoSettings: state.settings.videoSettings,
          audioSettings: action.settings || initialState.settings.audioSettings
        }
      })

    case types.SET_GAME_STATE:
      return ({
        ...state,
        game: action.game || initialState.game
      })

    default:
      return state;
  }
}