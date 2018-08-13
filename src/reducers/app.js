import * as types from '../constants/ActionTypes';

const initialState = {
  videoPlay: {
    nvidia: true,
    amd: false,
    ue4: false,
    frointier: false,
    menu: false
  },
  displays: {
    intro: 'flex',
    menu: {
      menu: 'none',
      main: 'none',
      settings: 'none',
      credits: 'none',
      exit: 'none'
    },
    game: 'none'
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
  }
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
        videoPlay: action.videoPlay || initialState.vidioPlay
      })

    default:
      return state;
  }
}