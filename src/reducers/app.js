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
    gameBlockLayout: {},
    ships: [{id: 0, shots: [], health: 3, position: 0 }]
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

    case types.SET_GAME_BLOCK_LAYOUT: 
      return ({
        ...state,
        game: {
          ...state.game,
          gameBlockLayout: action.gameBlockLayout
        }
      })

    case types.SET_POSITION:
      let obj = state.game.ships[0];
      obj.position = action.position;  
      return ({
        ...state,
        game: {
          ...state.game,
          ships: {
            ...state.game.ships,
            [0]: obj
          }
        }
      })

    case types.ADD_SHOT:
      state.game.ships[action.id].shots.push(action.shot);
      return ({
        ...state,
        game: {
          ...state.game,
          ships: state.game.ships
        }
      })

    case types.REMOVE_SHIP:
      delete state.game.ships[action.id]  
      return ({
        ...state,
        game: {
          ...state.game,
          ships: state.game.ships
        }
      })

    case types.REMOVE_SHOOT:
      delete state.game.ships[action.shipId].shots[action.shotId];  
      return ({
        ...state,
        game: {
          ...state.game,
          ships: state.game.ships
        }
      })

    default:
      return state;
  }
}