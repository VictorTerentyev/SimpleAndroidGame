import * as types from '../constants/ActionTypes';

const initialState = {
  id: '',
  content: {

  },
  displays: {

  },
  videoSettings: {

  }
  audioSettings: {

  }
}

export default function steamApp (state = initialState, action) {

  switch (action.type) {

    case types.INIT_STATE:
      return ({
        ...state,
        id: action.id || initialState.id,
        content: action.content || initialState.content,
        displays: action.displays || initialState.displays,
        videoSettings: action.videoSettings || initialState.videoSettings,
        audioSettings: action.audioSettings || initialState.audioSettings
      })

    default:
      return state;
  }
}