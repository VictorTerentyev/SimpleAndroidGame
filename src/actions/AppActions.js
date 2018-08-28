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

export function setGameState(state) {
  return {
    type: types.SET_GAME_STATE,
    state
  };
}

export function setPosition(position) {
  return {
    type: types.SET_POSITION,
    position
  };
}

export function addShip(ship) {
  return {
    type: types.ADD_SHIP,
    ship
  };
}

export function addShot(shot) {
  return {
    type: types.ADD_SHOT,
    shot
  };
}

export function removeShip(id) {
  return {
    type: types.REMOVE_SHIP,
    id
  };
}

export function removeShot(id) {
  return {
    type: types.REMOVE_SHOT,
    id
  };
}