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
    state: 'deactivated',
    ships: [{id: 0, health: 3, position: 0, side: 'left'}],
    shots: []
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
        game: {
          ...state.game,
          state: action.state
        }
      })

    case types.SET_POSITION:
      state.game.ships[0].position = action.position;  
      return ({
        ...state,
        game: {
          ...state.game,
          ships: {
            ...state.game.ships,
            [0]: state.game.ships[0]
          }
        }
      })

    case types.ADD_SHIP:
      state.game.ships.push(action.ship);
      return ({
        ...state,
        game: {
          ...state.game,
          ships: state.game.ships
        }
      })

    case types.ADD_SHOT:
      state.game.shots.push(action.shot);
      return ({
        ...state,
        game: {
          ...state.game,
          shots: state.game.shots
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
      delete state.game.shots[action.id];  
      return ({
        ...state,
        game: {
          ...state.game,
          shots: state.game.shots
        }
      })

    default:
      return state;
  }
}