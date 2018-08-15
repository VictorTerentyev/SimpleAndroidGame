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
      credits: 'none',
      exit: 'none'
    }
  },
  settings: {
    videoSettings: {
      brightness: 100
    },
    audioSettings: {
      volume: 100,
      effects: 100,
      music: 100
    },
    gameSettings: {
      mod: 'default'
    }
  },
  game: {

  }
}

export default function simpleAndroidGame (state = initialState, action) {

  switch (action.type) {

    case types.SET_SETTINGS:
      return ({
        ...state,
        settings: action.settings || initialState.settings
      })

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

    default:
      return state;
  }
}