import * as types from '../constants/ActionTypes';

export function setDisplay(display, value) {
  return {
    type: types.SET_DISPLAY,
    display,
    value
  };
}

export function videoPlay(video, value) {
  return {
    type: types.VIDEO_PLAY,
    video,
    value
  };
}

export function setSetting(setting, value) {
  return {
    type: types.SET_SETTING,
    setting,
    value
  };
}

export function setGameState(state) {
  return {
    type: types.SET_GAME_STATE,
    state
  };
}

export function setPosition(positionY) {
  return {
    type: types.SET_POSITION,
    positionY
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