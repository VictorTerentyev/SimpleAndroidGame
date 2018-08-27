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

export function setGameBlockLayout(gameBlockLayout) {
  return {
    type: types.SET_GAME_BLOCK_LAYOUT,
    gameBlockLayout
  };
}

export function setPosition(position) {
  return {
    type: types.SET_POSITION,
    position
  };
}

export function addShot(id, shot) {
  return {
    type: types.ADD_SHOT,
    id,
    shot
  };
}

export function removeShip(id) {
  return {
    type: types.REMOVE_SHIP,
    id
  };
}

export function removeShot(shipId, shotId) {
  return {
    type: types.REMOVE_SHOT,
    shipId,
    shotId
  };
}