import * as types from '../constants/ActionTypes';

export function setDisplays(displays) {
  return {
    type: types.SET_DISPLAYS,
    displays
  };
}

export function videoPlay(videoPaused) {
  return {
    type: types.VIDEO_PLAY,
    videoPaused
  };
}

export function setVideoSettings(settings) {
  return {
    type: types.SET_VIDEO_SETTINGS,
    settings
  };
}

export function setAudioSettings(settings) {
  return {
    type: types.SET_AUDIO_SETTINGS,
    settings
  };
}

export function setGameState(game) {
  return {
    type: types.SET_GAME_STATE,
    game
  };
}